/**
 @author caiweili
 @date 2017/10/6
 */
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var image = document.querySelector('#image');
var isDrawing = false;

// 执行
main();
function main() {
    eventHandler()
}

function eventHandler() {
    /**
     * touch event，阻止
     */
    canvas.addEventListener('pointerdown', function (e) {
        // e.preventNanipulation();
        isDrawing = true;
        console.log('pointerdown')
    }, false);
    /**
     * 开始绘画
     */
    canvas.addEventListener('mousedown', function (e) {
        console.log('mousedown')
        isDrawing = true;
    }, false);
    /**
     * 绘画
     */
    canvas.addEventListener('mousemove', function (e) {
        if (isDrawing) {

            // let sx = canvas.width / window.offsetWidth;
            let sx = canvas.width / window.innerWidth;
            // let sy = canvas.height / window.offsetHeight;
            let sy = canvas.height / window.innerHeight;
            // let x = sx * e.clientX - image.naturalWidth / 2;
            let x = sx * e.clientX - image.width / 2;
            // let y = sy * e.clientY - image.naturalHeight / 2;
            let y = sy * e.clientY - image.height / 2;
            console.log(`mousemove, isDrawing=${isDrawing}, x=${x}, y=${y}`)
            context.drawImage(image, x, y)
        }
    }, false);
    /**
     * 停止绘画
     */
    canvas.addEventListener('mouseup', function (e) {
        console.log('mouseup')
        isDrawing = false;
        let state = context.getImageData(0, 0, canvas.width, canvas.height);
        //保存历史记录
        history.pushState(state, null);
    }, false);
    // history
    window.addEventListener('popstate', function (e) {
        console.log('popstate')
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (e.state) {
            context.putImageData(e.state, 0, 0)
        }
    }, false);
}

//history 初始化时候保存为开始
let state = context.getImageData(0,0, canvas.width, canvas.height);
history.pushState(state, null)