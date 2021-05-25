// function solve() {
//     let parts = 16;
//     let partsWidht = 2 / parts;

//     let canvas = document.getElementById("canvas");
//     let ctx = canvas.getContext("2d");

//     for (let index = 0; index < parts; index++) {
//         let current = partsWidht * index;
//         let next = partsWidht * (index + 1);
//         ctx.beginPath();
//         ctx.arc(100, 75, 50, current * Math.PI, next * Math.PI);
//         if(index % 2 === 0) {
//             ctx.fillStyle = "#FF0000";
//         } else {
//             ctx.fillStyle = "green";
//         }
//         ctx.fill();
//     }

// }

// solve();

var myVinyls = {
    "Classical music": 2,
    "Alternative rock": 2,
    "Pop": 2,
    "Jazz": 2,
    "43 music": 2,
    "Alt643ernative rock": 2,
    "643Pop": 2,
    "643Jazz": 2,
    "Classica43l music": 2,
    "Alternat43ive rock": 2,
    "P4op": 2,
    "J54azz": 2
};

function solve() {

    function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }
    
    class Piechart {
        constructor(options) {
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.colors = options.colors;
        }

        draw () {
            var total_value = 0;
            var color_index = 0;
            for (var categ in this.options.data) {
                var val = this.options.data[categ];
                total_value += val;
            }

            var start_angle = 0;
            for (categ in this.options.data) {
                val = this.options.data[categ];
                var slice_angle = 2 * Math.PI * val / total_value;

                drawPieSlice(
                    this.ctx,
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    Math.min(this.canvas.width / 2, this.canvas.height / 2),
                    start_angle,
                    start_angle + slice_angle,
                    this.colors[color_index % this.colors.length]
                );

                start_angle += slice_angle;
                color_index++;
            }
        };
    }


    var myPiechart = new Piechart(
        {
            canvas: canvas,
            data: myVinyls,
            colors:["#fde23e","#f16e23", "#57d9ff","#937e88"]
        }
    );

    myPiechart.draw();

}

solve();