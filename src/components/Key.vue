
<template lang="jade">
    div
        key1(v-on:showpop="showPop" v-on:closepop="closePop"  v-if="currentKeyPage == 1" v-bind:is-show-pop="isShowPop" v-bind:current-title="currentTitle" v-bind:current-content="currentContent")
        key2(v-on:showpop="showPop" v-on:closepop="closePop"  v-if="currentKeyPage == 2" v-bind:is-show-pop="isShowPop" v-bind:current-title="currentTitle" v-bind:current-content="currentContent")
        key3(v-on:showpop="showPop" v-on:closepop="closePop"  v-if="currentKeyPage == 3" v-bind:is-show-pop="isShowPop" v-bind:current-title="currentTitle" v-bind:current-content="currentContent")
        transition(name='fade'  enter-active-class="animated fadeIn active" leave-active-class="animated fadeOut")
            div.pop(v-if="isShowPop")
                div.l-container
                    div.pop__bd
                        .pop__content
                            .pop__title(v-html="currentTitle")
                            .pop__text {{currentContent}}
                            .pop__ctrls
                                .pop__btn(v-on:click="closePop($event)") 了解！
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
    mounted() {
        var controller = new ScrollMagic.Controller();
        var tlGroup = {};

        var tlBg = new TimelineMax({
            repeat: 0,
            delay: 1.2,
            smoothChildTiming: true,
            paused: true,
            yoyo: false
        });

        tlBg.add(
            TweenMax.fromTo(
                $('.key__title'),
                0.4,
                {
                    y: -50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1
                }
            ),
            0
        );

        // tlBg.add(
        //     TweenMax.fromTo(
        //         $('.index__link-test'),
        //         0.3,
        //         {
        //             y: -20,
        //             opacity: 0
        //         },
        //         {
        //             y: 0,
        //             opacity: 1
        //         }
        //     ),
        //     0
        // );

        tlBg.add(
            TweenMax.fromTo(
                $('.key__flow__main'),
                0.4,
                {
                    y: -50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1
                }
            ),
            '-=0.1'
        );
        if (!IsMobile) {
            tlBg.add(
                TweenMax.fromTo(
                    $('.key__flow__bread--1'),
                    0.4,
                    {
                        y: -30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1
                    }
                ),
                '-=0.1'
            );

            tlBg.add(
                TweenMax.fromTo(
                    $('.key__flow__bread--2'),
                    0.4,
                    {
                        y: -30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1
                    }
                ),
                '-=0.1'
            );

            tlBg.add(
                TweenMax.fromTo(
                    $('.key__flow__bread--3'),
                    0.4,
                    {
                        y: -30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1
                    }
                ),
                '-=0.1'
            );
        }

        tlBg.add(
            TweenMax.fromTo(
                $('.key__anis'),
                0.4,
                {
                    y: -20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1
                }
            ),
            '+=0.6'
        );

        tlBg.add(
            TweenMax.fromTo(
                $('.key__item .ani-wrap'),
                0.6,
                {
                    y: -20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1
                }
            ),
            '-=0.1'
        );

        tlBg.play();

        // new ScrollMagic.Scene({
        //     triggerElement: '.key__item--1'
        // })
        //     .setTween(tl)
        //     .addTo(controller);
    },
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
            this.isShowPop = false;
        }
    }
};
</script>

<style scoped>

</style>
