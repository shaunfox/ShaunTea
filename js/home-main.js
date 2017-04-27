var app = angular.module('myApp', [])

app.controller("signUpController", function($scope) {
    $scope.userdata = {};
    $scope.submitForm = function() {
        console.log($scope.userdata);
        if ($scope.signUpForm.$invalid) {
            console.log('no')
        } else {
            console.log('yes')
        }
    }
})

app.controller('myCtrl', function($scope) {
    $scope.userdata.gender = "male";
});


app.directive('compare', function() {
    // 创建一个对象，函数结束后返回
    var o = {};
    // 命令作用在元素和属性上
    o.strict = 'AE';
    o.scope = {
        orgText: '=compare'
    }
    o.require = 'ngModel';
    // 这是主函数，有传参
    o.link = function(sco, ele, att, con) {
        // v就是用户输入的值
        con.$validators.compare = function(v) {
                return v == sco.orgText;
            }
            // 随时监测输入值
        sco.$watch('orgText', function() {
            con.$validate();
        });

    }

    return o;
})
