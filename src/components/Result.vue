
<template lang="jade">
div
    section.result
        div.result__hd
        div.result__bd
            div.l-container
                div(v-if="resultType == 0 ")
                    .result1.active
                        .title 
                            span.mark 初級
                            |麵包新手-復古好滋味
                        .desc Wow！愛麵包的你，雖然很享受每一口的溫暖美味，但不能不了解麵包的製作細節呀~~快往下看熊健康的麵包知識大解析，感受食的安心，再挑戰一次！
                        div.img-wrap
                            img(src="./images/end-bread1.png")
                    .result__share
                        p.text 分享你的結果
                        - var shareUrl = 'http://topic.commonhealth.com.tw/pecos-bread/result1.html';
                        - var shareUrlDecode = 'http%3A%2F%2F#topic.commonhealth.com.tw%2Fpecos-bread%2Fresult1.html';
                        - var shareText = "喜愛麵包的我，原來是：初級麵包新手-復古好滋味！麵包百百種，麵包知識更是萬萬種~快來挑戰限時麵包大會考，由康健熊健康出題，測試你是不是麵包達人唷"
                        .result__share__items
                            div.result__share__item.square_fb
                                //todo: data-href and href need absolute href.
                                div.fb-share-button(data-href=shareUrl, data-layout='button', data-size='small', data-mobile-iframe='true')
                                    a.fb-xfbml-parse-ignore(target='_blank', href='https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F'+{shareUrlDecode}+'&src=sdkpreparse') 分享
                            div.result__share__item.square_line
                                div.line-it-button(data-lang='zh_Hant', data-type='share-c', style='display: none;' data-url=shareUrl)
                            div.result__share__item.square_tw
                                //todo: url, text
                                a.twitter-share-button(href='https://twitter.com/intent/tweet?text='+shareText+'&url='+shareUrl, data-size='large')
                            div.result__share__item.square_gl
                                div.g-plus(data-action='share', data-width='120', data-height='24', data-href=shareUrl)  
                div(v-if="resultType == 1 ")
                    .result2.active
                        .title 
                            span.mark 中高級
                            |麵包小當家-意猶未盡的美味
                        .desc 不錯喔！懂得分辨美味麵包，你就像麵包界的青蔥起士，讓人熟悉又意猶未盡！想知道如何得到經典麵包？快往下看熊健康麵包秘密大解析，再挑戰一次！
                        div.img-wrap
                            img(src="./images/end-bread2.png")
                    .result__share
                        p.text 分享你的結果
                        - var shareUrl = 'http://topic.commonhealth.com.tw/pecos-bread/result2.html';
                        - var shareUrlDecode = 'http%3A%2F%2F#topic.commonhealth.com.tw%2Fpecos-bread%2Fresult2.html';
                        - var shareText = "喜愛麵包的我，原來是：高級麵包小當家，意猶未盡的美味！麵包百百種，麵包知識更是萬萬種~快來挑戰限時麵包大會考，由康健熊健康出題，測試你是不是麵包達人唷"
                        .result__share__items
                            div.result__share__item.square_fb
                                //todo: data-href and href need absolute href.
                                div.fb-share-button(data-href=shareUrl, data-layout='button', data-size='small', data-mobile-iframe='true')
                                    a.fb-xfbml-parse-ignore(target='_blank', href='https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F'+{shareUrlDecode}+'&src=sdkpreparse') 分享
                            div.result__share__item.square_line
                                div.line-it-button(data-lang='zh_Hant', data-type='share-c', style='display: none;' data-url=shareUrl)
                            div.result__share__item.square_tw
                                //todo: url, text
                                a.twitter-share-button(href='https://twitter.com/intent/tweet?text='+shareText+'&url='+shareUrl, data-size='large')
                            div.result__share__item.square_gl
                                div.g-plus(data-action='share', data-width='120', data-height='24', data-href=shareUrl)  
                div(v-if="resultType == 2 ")
                    .result3.active
                        .title 
                            span.mark 高階
                            |麵包專業達人-經典中的經典
                        .desc  超棒的！不只麵包細節，連製程、購買細節都考不倒你啊！知性與理性交織，簡直是麵包界的海鹽羅宋！往下看看熊健康的麵包知識大解析，為你的智慧再添經典。
                        div.img-wrap
                            img(src="./images/end-bread2.png")
                    .result__share
                        p.text 分享你的結果
                        - var shareUrl = 'http://topic.commonhealth.com.tw/pecos-bread/result3.html';
                        - var shareUrlDecode = 'http%3A%2F%2F#topic.commonhealth.com.tw%2Fpecos-bread%2Fresult3.html';
                        - var shareText = "喜愛麵包的我，原來是：高階麵包專業達人，經典中的經典！麵包百百種，麵包知識更是萬萬種~快來挑戰限時麵包大會考，由康健熊健康出題，測試你是不是麵包達人唷"
                        .result__share__items
                            div.result__share__item.square_fb
                                //todo: data-href and href need absolute href.
                                div.fb-share-button(data-href=shareUrl, data-layout='button', data-size='small', data-mobile-iframe='true')
                                    a.fb-xfbml-parse-ignore(target='_blank', href='https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F'+{shareUrlDecode}+'&src=sdkpreparse') 分享
                            div.result__share__item.square_line
                                div.line-it-button(data-lang='zh_Hant', data-type='share-c', style='display: none;' data-url=shareUrl)
                            div.result__share__item.square_tw
                                //todo: url, text
                                a.twitter-share-button(href='https://twitter.com/intent/tweet?text='+shareText+'&url='+shareUrl, data-size='large')
                            div.result__share__item.square_gl
                                div.g-plus(data-action='share', data-width='120', data-height='24', data-href=shareUrl)          
                .result__more
                    p.text 想知道所有答案嗎？
                    a.btn(href="#libarys"): span 往下看更多解答                   
        div.result__ft
    //- ResultLibarys
    //- ResultChart
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
        alert("!!!!!!!!!");
        
        var url = new URL(location.href);
        let userCorrectcCount = url.searchParams.get('count') || 0;

        alert(url.searchParams.get('count'));

        if (userCorrectcCount <= 4) {
            this.resultType = 0;
        } else if (userCorrectcCount <= 6) {
            this.resultType = 1;
        } else if (userCorrectcCount <= 8) {
            this.resultType = 2;
        }
    },
    methods: {
    }
};
</script>

<style scoped>

</style>
