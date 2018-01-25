
<template lang="jade">
    div
        key1(v-on:showpop="showPop" v-on:closepop="closePop"  v-show="currentKeyPage == 1" v-bind:is-show-pop="isShowPop" v-bind:current-title="currentTitle" v-bind:current-content="currentContent")
        key2(v-on:showpop="showPop" v-on:closepop="closePop"  v-show="currentKeyPage == 2" v-bind:is-show-pop="isShowPop" v-bind:current-title="currentTitle" v-bind:current-content="currentContent")
        key3(v-on:showpop="showPop" v-on:closepop="closePop"  v-show="currentKeyPage == 3" v-bind:is-show-pop="isShowPop" v-bind:current-title="currentTitle" v-bind:current-content="currentContent")
        transition(name='fade'  enter-active-class="animated fadeIn active" leave-active-class="animated fadeOut")
            div.pop(v-show="isShowPop")
                div.l-container
                    div.pop__bd
                        .pop__content
                            .pop__title(v-html="currentTitle")
                            .pop__text {{currentContent}}
                            .pop__ctrls
                                .pop__btn(v-on:click="closePop($event)") 了解!
</template>

<script>
import Key1 from './Key1.vue';
import Key2 from './Key2.vue';
import Key3 from './Key3.vue';

export default {
    name: 'Key',
    components: {
        Key1,
        Key2,
        Key3
    },
    props: ['currentKeyPage'],
    data() {
        return {
            currentTitle: '',
            currentContent: '',
            isShowPop: false
        };
    },
    computed: {},
    mounted() {},
    methods: {
        showPop: function(e, itemOrder) {
            var order = itemOrder + 1;
            var dItem = $('.key' + this.currentKeyPage + ' .key__item.key__item--' + order);

            var _currentTitle = dItem.find('.title').text();
            var _currentContent = dItem.find('.content').text();

            this.currentTitle = _currentTitle;
            this.currentContent = _currentContent;
            this.isShowPop = true;
        },
        closePop: function(e) {
            e.preventDefault();
            console.log('close');
            this.isShowPop = false;
        }
    }
};
</script>

<style scoped>

</style>
