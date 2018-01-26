
<template lang="jade"  src="../_qa.jade">
</template>

<script>
export default {
    name: 'Qa',
    data() {
        return {
            isShowResult: false,
            displayResult: false,
            currentSelected: -1,
            currentCount: 0,
            timeCount: 5,
            currentQuestion: 0,
            typeNames: ['一般麵包知識題', '包裝麵包認知題', '麵包達人得分題'],
            ans: [1, 2, 2, 3, 1, 2, 2, 1],
            selectedAns: [],
            selectedAnsResult: [],
            types: [1, 1, 1, 2, 2, 2, 3, 3],
            questions: [
                {
                    title: '製成麵包需要哪四大基本元素？',
                    type: '一般麵包知識題',
                    options: ['麵粉、水、<br>鹽、酵母', '麵粉、水、<br>油脂、蛋']
                },
                {
                    title: '哪個菌種作用，讓麵包可以蓬鬆柔軟？',
                    type: '一般麵包知識題',
                    options: ['我覺得是<br>乳酸菌', '應該是<br>酵母菌']
                },
                {
                    title: '麵包不添加防腐劑，會很容易發霉？',
                    type: '一般麵包知識題',
                    options: ['好像是', '不一定吧']
                },
                {
                    title: '年輕媽媽購買麵包給小朋友吃時，應該建議她注意下列哪項？',
                    type: '包裝麵包認知題',
                    options: [
                        '原料、營養標示、<br>過敏原宣稱',
                        '製造日期、<br>保存期限',
                        '以上皆是'
                    ]
                },
                {
                    title: '麵包剛出爐，應該控制什麼環境因子來維持鮮度？',
                    type: '包裝麵包認知題',
                    options: ['溫濕度', '光線明暗度']
                },
                {
                    title: '以下哪一個是臺灣人記憶深刻的麵包品牌logo？',
                    type: '包裝麵包認知題',
                    options: [
                        '<img src="./images/qa-logo.png">',
                        '<img src="./images/qa-logo.png">'
                    ]
                },
                {
                    title: '哪種麵包的製作方法，需費時較長時間？',
                    type: '麵包達人得分題',
                    options: [
                        '我知道，是直接法<span>Straight-Dough<br/>Metho</span>',
                        '我超懂，是中種法<span>Sponge-Dough<br/>Method</span>'
                    ]
                },
                {
                    title: '麵包多以下哪個元素，能有較佳風味？',
                    type: '麵包達人得分題',
                    options: ['低溫熟成的<br>自製老麵種', '單一成分的<br>純麵粉']
                }
            ],
            lvTotalCount: {
                lv1Count: null,
                lv2Count: null,
                lv3Count: null
            }
        };
    },
    computed: {},
    mounted() {
        this.resetTimeCount();
        for (let i = 0; i < 8; i++) {
            this.selectedAns.push(-1);
            this.selectedAnsResult.push(false);
        }
        _firebase
            .database()
            .ref()
            .on('value', snapshot => {
                this.lvTotalCount = {
                    lv1Count: snapshot.child('lv1Count').val(),
                    lv2Count: snapshot.child('lv2Count').val(),
                    lv3Count: snapshot.child('lv3Count').val()
                };
            });
    },
    timeInterval: null,
    methods: {
        resetTimeCount: function() {
            this.timeCount = 5;
            this.timeInterval = setInterval(() => {
                let time = this.timeCount;
                if (this.timeCount <= 0) {
                    clearInterval(this.timeInterval);
                    this.checkAns(this.currentQuestion, -1);
                } else {
                    time--;
                    this.timeCount = time;
                }
            }, 1000);
        },
        resetToNextQuestion: function() {
            this.currentQuestion = Math.min(7, this.currentQuestion + 1);
            this.isShowResult = false;
            this.displayResult = false;
            this.currentSelected = -1;
            this.resetTimeCount();
        },
        checkAns: function(questionIndex, ans) {
            this.selectedAns[this.currentQuestion] = ans;
            let isOk = ans == this.ans[questionIndex];
            this.selectedAnsResult[this.currentQuestion] = isOk;
            this.displayResult = isOk;
            this.isShowResult = true;

            if (this.currentQuestion < 7) {
                setTimeout(() => {
                    this.resetToNextQuestion();
                }, 1500);
            } else {
                //送出作答結果，等待後 轉到結果頁 帶網址參數
                let correctCount = 0;
                $(this.selectedAnsResult).each((index, item) => {
                    if (item) {
                        correctCount++;
                    }
                });
                console.log('答對: ' + correctCount);
                this.submitResult(correctCount);
            }
        },
        submitResult(correctCount) {
            let resultLv = 1;

            if (correctCount <= 4) {
                resultLv = 1;
            } else if (correctCount <= 6) {
                //type2 ++
                resultLv = 2;
            } else if (correctCount <= 8) {
                //type3 ++
                resultLv = 3;
            }

            let updateData = {};

            updateData[`lv${resultLv}Count`] = this.lvTotalCount[`lv${resultLv}Count`] + 1;

            _firebase
                .database()
                .ref()
                .update(updateData, function(error) {
                    setTimeout(() => {
                        location.replace(`result.html?count=${correctCount}`);
                    }, 1500);
                });
        },
        selectedOption: function(e, questionIndex, ans) {
            e.preventDefault();
            this.currentSelected = ans;
            clearInterval(this.timeInterval);
            this.checkAns(questionIndex, ans);
        }
    }
};
</script>

<style scoped>

</style>
