angular.module('starter.directives.imageUploader', [])
        .directive('imageUploader', function (Camera, Api) {
            return {
                restrict: 'A',
                scope: {
                    options: '=imageUploader'
                },
                controller: function ($scope) {
                    var defaultOptions = {
                        title: 'ADD PHOTO'
                    };
                    for (var k in defaultOptions) {
                        $scope.options[k] = $scope.options[k] || defaultOptions[k];
                    }
                    $scope.select = function () {
                        Camera.getPicture().then(function (photo) {
                            $scope.options.success(photo);
//                            Api.uploadImage().then(function(data){
//                                console.log(data);
//                                $scope.options.success(photo);
//                            },
//                            function(err){
//                                console.log(err);
//                            });
                            
                        }, function (err) {
                            console.log(err);
                        });
                    };
//                    $('input:file').show();
//                    $(document).off('change', "input:file").on('change', "input:file", function () {
//                        var file = this.files[0];
//                        console.log(file);
//                        if (file) {
//                            var shouldResize = true;
//                            if (file.name.indexOf('.gif') > -1) {
//                                shouldResize = false;
//                            }
//                            if (shouldResize) {
//                                $.canvasResize(file, {
//                                    width: 640,
//                                    quality: 100,
//                                    callback: function (content, width, height) {
//                                        var fileName = correctFileName(file.name);
////                        var parseFile = new Parse.File(fileName, {base64: content});
//                                        console.log(fileName);
//                                        $('input:file').val('');
//                                    }
//                                });
//                            } else {
//                                var fileName = correctFileName(file.name);
////                    var parseFile = new Parse.File(fileName, file);
////                    $scope.options.success(parseFile);
////                    $('input:file').val('');
//                            }
//                        } else {
//                            alert('No new image to save.');
//                        }
//                    });
                },
                link: function ($scope, ele, attrs, c) {
                    var clickHandler = function () {
                        $scope.select();
                    };
                    ele.unbind('click', clickHandler)
                            .bind('click', clickHandler);
                },
                templateUrl: 'templates/partials/image-uploader.html'
            };
        });
