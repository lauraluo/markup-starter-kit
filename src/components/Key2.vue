
<template lang="jade" src="../_key2.jade">
</template>

<script>
export default {
    name: 'Key2',
    props: ['currentTitle', 'currentContent', 'isShowPop'],
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {
        showPop: function(e, itemOrder) {
            e.preventDefault();
            this.$emit('showpop', e, itemOrder);
        },
        closePop: function(e) {
            e.preventDefault();
            this.$emit('closepop', e);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
