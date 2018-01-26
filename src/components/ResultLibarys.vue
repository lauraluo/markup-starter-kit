
<template lang="jade" src="../_libarys.jade">

</template>

<script>
export default {
    name: 'ResultLibarys',
    props: [],
    data() {
        return {
            currentOpened: 1
        };
    },
    computed: {},
    mounted() {
        var dContent = $(this.$refs[`content${this.currentOpened}`]);
        dContent.slideDown();
    },
    methods: {
        toogleLibary: function(event, targetId) {
            var dContent = $(this.$refs[`content${targetId}`]);
            if (targetId == this.currentOpened) {
                dContent.slideUp();
                this.currentOpened = 0;
            } else {
                this.currentOpened = targetId;
                dContent.slideDown();
            }
        }
    }
};
</script>

<style scoped>

</style>
