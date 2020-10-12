let rk_selected = true;
refresh();
$('#rk-btn').on('click', function () {
    console.log('rk-btn');
    rk_selected = true;
    refresh();
})
$('#srk-btn').click(function () {
    console.log('skr-btn');
    rk_selected = false;
    refresh();
})

function refresh() {
    if (rk_selected) {
        //设置按钮
        $('#rk-btn').attr("disabled", true)
        $('#srk-btn').attr("disabled", false)
    } else {
        //设置按钮
        $('#rk-btn').attr("disabled", false)
        $('#srk-btn').attr("disabled", true)
    }
    $('#wDiv').toggleClass("noDisplay")
}

//计算
$("#form").submit((e) => {
    e.preventDefault();
    cal();
})

function cal() {
    const R = 8.314;
    //R-K方程
    let T = eval($('#T').val());
    let p = eval($('#p').val());
    let Tc = eval($('#Tc').val());
    let Pc = eval($('#Pc').val());
    let count = Math.floor(eval($('#count').val()));
    if (rk_selected) {
        if (count < 1) {
            return;
        }
        let Vm = R * T / p;

        let a = (0.42748) * R * R * Math.pow(Tc, 2.5) / Pc;
        let b = (0.08664) * R * Tc / Pc;
        for (let i = 0; i < count; i++) {
            Vm = (R * T / p) + b - a * (Vm - b) / (Math.sqrt(T) * p * Vm * (Vm + b));
        }
        let z = p * Vm / R / T;
        alert("Vm: " + Vm + '\n' + "Z: " + z + "\n" + "a: " + a + "\n" + "b: " + b);
    }

    //SRK方程
    else {
        let w = eval($('#w').val()) || 1;
        let Tr = T / Tc;
        let b = 0.08664 * R * Tc / Pc;
        let m = 0.48 + 1.574 * w - 0.176 * w * w;
        let alpha = Math.pow(1 + m * (1 - Math.sqrt(Tr)), 2);
        let at = 0.42748 * R * R * Tc * Tc * alpha / Pc;
        let Vm = R * T / p;
        let Z = p * Vm / R / T;

        for (let i = 0; i < count; i++) {
            Vm = (R * T / p) + b - at * (Vm - b) / p * (Vm * (Vm + b));
        }
        alert('a(T): ' + at + '\nalpha: ' + alpha + '\nm: ' + m + '\nb: ' + b + '\nTr: ' + Tr + '\nVm: ' + Vm + '\nZ: ' + Z)
    }
}