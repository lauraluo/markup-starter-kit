
<template lang="jade">
div
    section.result
        div.result__hd
        div.result__bd
            div.l-containera
                .result1(v-if="resultType == 0")
                    .title 
                        span.mark 初級
                        |麵包新手-復古好滋味
                    .desc Wow！愛麵包的你，雖然很享受每一口的溫暖美味，但不能不了解麵包的製作細節呀~~快往下看熊健康的麵包知識大解析，感受食的安心，再挑戰一次！
                    div.img-wrap
                        img(src="/images/end-bread1.png")
                .result2(v-if="resultType == 1")
                    .title 
                        span.mark 中高級
                        |麵包小當家-意猶未盡的美味
                    .desc 不錯喔！懂得分辨美味麵包，你就像麵包界的青蔥起士，讓人熟悉又意猶未盡！想知道如何得到經典麵包？快往下看熊健康麵包秘密大解析，再挑戰一次！
                    div.img-wrap
                        img(src="/images/end-bread2.png")
                .result3(v-if="resultType == 2")
                    .title 
                        span.mark 高階
                        |麵包專業達人-經典中的經典
                    .desc 不錯喔！懂得分辨美味麵包，你就像麵包界的青蔥起士，讓人熟悉又意猶未盡！想知道如何得到經典麵包？快往下看熊健康麵包秘密大解析，再挑戰一次！
                    div.img-wrap
                        img(src="/images/end-bread3.png")
                .result__share
                    p.text 分享你的結果
                    div.result__share__items.clearfix
                        div.result__share__item.square_fb
                        div.result__share__item.square_line
                        div.result__share__item.square_tw
                        div.result__share__item.square_gl           
                .result__more
                    p.text 想知道所有答案嗎？
                    a.btn(href="#"): span 往下看更多解答                   
        div.result__ft
    ResultLibarys
    ResultChart
</template>

<script>
import ResultChart from './ResultChart.vue';
import ResultLibarys from './ResultLibarys.vue';

export default {
    name: 'Result',
    components: {
        ResultChart,
        ResultLibarys
    },
    props: [],
    data() {
        return {
            resultType: 0
        };
    },
    computed: {},
    mounted() {
        var url = new URL(location.href);
        let userCorrectcCount = url.searchParams.get('count') || 0;
        if (userCorrectcCount <= 4) {
            this.resultType = 0;
        } else if (userCorrectcCount <= 6) {
            this.resultType = 1;
        } else if (userCorrectcCount <= 8) {
            this.resultType = 2;
        }
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
            console.log('close');
            this.isShowPop = false;
        }
    }
};
</script>

<style scoped>

</style>
