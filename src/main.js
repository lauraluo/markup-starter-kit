import Vue from 'vue';
import Menu from './components/Menu.vue';
import Key from './components/Key.vue';
import Qa from './components/Qa.vue';
import Result from './components/Result.vue';
import Index from './components/Index.vue';
import Test from './components/Test.vue';

new Vue({
    el: '#nav',
    render: h => h(Menu)
});

if ($('#key').length > 0) {
    new Vue({
        el: '#key',
        render: function(createElement) {
            var href = location.href;
            var _currentKeyPage = 0;

            if (href.indexOf('key.1') > -1) {
                _currentKeyPage = 1;
            } else if (href.indexOf('key.2') > -1) {
                _currentKeyPage = 2;
            } else if (href.indexOf('key.3') > -1) {
                _currentKeyPage = 3;
            }

            return createElement(Key, {
                props: {
                    currentKeyPage: _currentKeyPage
                }
            });
        }
    });
}

if ($('#qa').length > 0) {
    console.log('init qa');
    new Vue({
        el: '#qa',
        render: h => h(Qa)
    });
}

if ($('#result').length > 0) {
    console.log('init qa');
    new Vue({
        el: '#result',
        render: function(createElement) {
            var href = location.href;

            return createElement(Result, {
                props: {}
            });
        }
    });
}

if ($('#index').length > 0) {
    new Vue({
        el: '#index',
        render: h => h(Index)
    });
}

if ($('#test').length > 0) {
    new Vue({
        el: '#test',
        render: h => h(Test)
    });
}
