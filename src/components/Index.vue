
<template lang="jade" src="../_index.jade">
</template>

<script>
export default {
    name: 'Index',

    data() {
        return {};
    },
    computed: {},
    mounted() {
        var dishTl = new TimelineMax({
            repeat: -1,
            delay: 1,
            smoothChildTiming:true,
            paused: false,
            yoyo: false
        });

        var coverTl = new TimelineMax({
            repeat: 0,
            delay: 1,
            smoothChildTiming:true,
            paused: false,
            yoyo: false
        });

        for (let i = 0; i <= 3; i++) {
            let tweenTime = 1;
            let delayTime = 5;

            dishTl.add(
                TweenMax.fromTo(
                    $(this.$refs[`dish${i + 1}`]),
                    tweenTime,
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ),
                delayTime * i
            );
            dishTl.add(
                TweenMax.to($(this.$refs[`dish${i + 1}`]), tweenTime, {
                    opacity: 0
                }),
                `+=${delayTime}`
            );
        }

        let coverTlTweenTime = 0.6;
        let coverTlPaddingTime = '-=0.3';

        coverTl.add(
            TweenMax.fromTo(
                $(this.$refs.title),
                coverTlTweenTime,
                {
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    y: -0
                }
            ),
            0
        );

        coverTl.add(
            TweenMax.fromTo(
                $(this.$refs.cover),
                coverTlTweenTime,
                {
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    y: -0
                }
            ),
            coverTlPaddingTime
        );

        coverTl.add(
            TweenMax.fromTo(
                $(this.$refs.keys),
                coverTlTweenTime,
                {
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    y: -0
                }
            ),
            coverTlPaddingTime
        );

        coverTl.add(
            TweenMax.fromTo(
                $(this.$refs.note),
                coverTlTweenTime,
                {
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    y: -0
                }
            ),
            coverTlPaddingTime
        );
    },
    methods: {}
};
</script>

<style scoped>

</style>
