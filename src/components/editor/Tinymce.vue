<template>
    <div class="tinymce-container">
        <Editor  v-model="content" :api-key="apiKey" :init="init" />
    </div>
</template>
<script>
    import Editor from "@tinymce/tinymce-vue";
    // import { reactive, ref, toRefs } from "@vue/reactivity";
    import { reactive, ref, toRefs,watch } from "vue"
    export default  {
        components: {
            Editor
        },
        props: {
            html: {
                type: String,
                default: ''
            },
            htmlContent: {
                type: String,
                default: ''
            },
            resize: {
                type: [String , Boolean],
                default: false
            },
            height: {
                type: Number,
                default: 500
            }
        },
        setup(props, {emit}) {
            const content = ref("");
            const tiny = reactive({
                apiKey: "uduwl0khdhgoyljbtpte1p1nphq3xvglrx5v8vf8pqvubde5", //https://github.com/tinymce/tinymce-vue/blob/main/src/demo/views/Iframe.vue
                init: {
                    base_url: '/tinymce/',
                    language: "zh_CN", //语言类型
                    language_url: '/tinymce/langs/zh_CN.js',
                    // skin_url: '/tinymce/skins/ui/oxide',
                    placeholder: "欢迎使用Tinymce编辑器", //textarea中的提示信息
                    min_width: 320,
                    min_height: 220,
                    height: props.height, //注：引入autoresize插件时，此属性失效
                    // resize: "both", //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
                    resize: props.resize, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
                    branding: true, //tiny技术支持信息是否显示
                    // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
                    // elementpath: false, //元素路径是否显示

                    font_formats:
                        "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;", //字体样式
                    plugins:
                        "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons", //插件配置 axupimgs indent2em
                    toolbar: [
                        "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ",
                        "styleselect formatselect fontselect fontsizeselect |  table image axupimgs media emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print preview | indent2em lineheight formatpainter",
                    ], //工具栏配置，设为false则隐藏
                    // menubar: "file edit my1", //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

                    // images_upload_url: '/apib/api-upload/uploadimg',  //后端处理程序的url，建议直接自定义上传函数image_upload_handler，这个就可以不用了
                    // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
                    paste_data_images: true, //图片是否可粘贴
                    //此处为图片上传处理函数
                    images_upload_handler: (blobInfo, success, failure) => {
                        // 这里用base64的图片形式上传图片,
                        let reader = new FileReader(); //本地预览
                        reader.readAsDataURL(blobInfo.blob());
                        reader.onloadend =  ()=> {
                            const imgbase64 = reader.result;
                            success(imgbase64);
                        };
                        console.log('failure',failure)
                    },

                    file_picker_types: "file image media", //file image media分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
                    // 文件上传处理函数
                    file_picker_callback: function (callback, value, meta) {
                        // 使用案例http://tinymce.ax-z.cn/general/upload-images.php
                        // meta.filetype  //根据这个判断点击的是什么file image media

                        let filetype; //限制文件的上传类型,需要什么就添加什么的后缀
                        if (meta.filetype == "image") {
                            filetype = ".jpg, .jpeg, .png, .gif, .ico, .svg";
                        } else if (meta.filetype == "media") {
                            filetype = ".mp3, .mp4, .avi, .mov";
                        } else {
                            filetype =
                                ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .jpg, .jpeg, .png, .gif, .ico, .svg";
                        }
                        let inputElem = document.createElement("input"); //创建文件选择
                        inputElem.setAttribute("type", "file");
                        inputElem.setAttribute("accept", filetype);
                        inputElem.click();
                        inputElem.onchange = () => {
                            let file = inputElem.files[0]; //获取文件信息

                            // 所有都转成base64文件流,来自官方文档https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback
                            let reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = function () {
                                // Note: Now we need to register the blob in TinyMCEs image blob
                                // registry. In the next release this part hopefully won't be
                                // necessary, as we are looking to handle it internally.
                                let id = "blobid" + new Date().getTime();
                                // let blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                let blobCache = tiny.activeEditor.editorUpload.blobCache;
                                let base64 = reader.result.split(",")[1];
                                let blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);

                                // call the callback and populate the Title field with the file name
                                callback(blobInfo.blobUri(), { title: file.name });
                            }
                        }
                    }
                }
            })
            watch(content, (newValue, oldValue) => {
                emit('getContent',newValue)
                console.log(newValue, oldValue)
            },{immediate: false})
            watch(()=>props.htmlContent, (newValue, oldValue)=>{
                content.value = newValue
                console.error(newValue, oldValue)
            })
            return {
                content,
                ...toRefs(tiny),
            }
        }

    }
</script>
<style  lang="scss" scoped>

</style>
