
<template lang="jade" src="../_chart.jade">

</template>

<script>
export default {
    name: 'ResultChart',
    props: [],
    data() {
        return {
            lv1Count: 0,
            lv2Count: 0,
            lv3Count: 0,
            totalSum: 0,
            userCorrectcCount: 0,
            lv1DisplayNumber: 0,
            lv2DisplayNumber: 0,
            lv3DisplayNumber: 0
        };
    },
    computed: {},
    mounted() {
        var url = new URL(location.href);
        this.userCorrectcCount = url.searchParams.get('count') || 0;
        _firebase
            .database()
            .ref()
            .on('value', snapshot => {
                this.lv1Count = snapshot.child('lv1Count').val();
                this.lv2Count = snapshot.child('lv2Count').val();
                this.lv3Count = snapshot.child('lv3Count').val();

                this.totalSum = this.lv1Count + this.lv2Count + this.lv3Count;
                this.lv1DisplayNumber = Math.floor(this.lv1Count / this.totalSum * 100);
                this.lv2DisplayNumber = Math.floor(this.lv2Count / this.totalSum * 100);
                this.lv3DisplayNumber = 100 - this.lv1DisplayNumber - this.lv2DisplayNumber;
                this.runChart();
            });
    },
    methods: {
        runChart: function() {
            var controller = new ScrollMagic.Controller();
            var canvasWidth = $(this.$refs.userBar).width();
            var peopleWidth = $(this.$refs.user).width();
            var tl = new TimelineMax({
                delay: 1,
                smoothChildTiming:true
            });

            var bar1Height = Math.pow(this.lv1Count / this.totalSum * 100, 0.5) * 10;
            var bar2Height = Math.pow(this.lv2Count / this.totalSum * 100, 0.5) * 10;
            var bar3Height = Math.pow(this.lv3Count / this.totalSum * 100, 0.5) * 10;

            tl.add(
                TweenMax.fromTo(
                    $(this.$refs.bar1),
                    1,
                    {
                        height: '0%'
                    },
                    {
                        height: `${bar1Height}%`
                    }
                ),
                0
            );

            tl.add(
                TweenMax.fromTo(
                    $(this.$refs.user),
                    1,
                    {
                        transformOrigin: '50% 50%',
                        x: `-${peopleWidth / 2 - 5}px`
                    },
                    {
                        x: `${this.userCorrectcCount / 8 * canvasWidth - peopleWidth / 2 + 5}px`
                    }
                ),
                0
            );
            tl.add(
                TweenMax.fromTo(
                    $(this.$refs.userDisplayBar),
                    1,
                    {
                        width: `${0}%`
                    },
                    {
                        width: `${this.userCorrectcCount / 8 * 100}%`
                    }
                ),
                0
            );

            tl.add(
                TweenMax.fromTo(
                    $(this.$refs.bar2),
                    1,
                    {
                        height: '0%'
                    },
                    {
                        height: `${bar2Height}%`
                    }
                ),
                '-=1'
            );
            tl.add(
                TweenMax.fromTo(
                    $(this.$refs.bar3),
                    1,
                    {
                        height: '0%'
                    },
                    {
                        height: `${bar3Height}%`
                    }
                ),
                '-=1'
            );

            if (!IsMobile) {
                new ScrollMagic.Scene({
                    duration: 100,	// the scene should last for a scroll distance of 100px
                    offset: -100
                })
                    .setTween(tl)
                    .addTo(controller);
            }
        }
    }
};
</script>

<style scoped>

</style>
