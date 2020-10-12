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
        //设置表单
        $("#formDiv").html(` <form id="form"> <div class="form-group">
        <label for="T">输入T：</label>
        <input type="number" class="form-control" id="T" aria-describedby="emailHelp" required>
    </div>
    <div class="form-group">
        <label for="p">输入p：</label>
        <input type="number" class="form-control" id="p" required>
    </div>
    <div class="form-group">
        <label for="Tc">输入Tc：</label>
        <input type="number" class="form-control" id="Tc" required>
    </div>
    <div class="form-group">
        <label for="Pc">输入Pc：</label>
        <input type="number" class="form-control" id="Pc" required>
    </div>
    <div class="form-group">
        <label for="count">输入迭代次数</label>
        <input type="number" class="form-control" id="count" required>
    </div>
    <button type="submit" id="submit_btn" class="btn btn-primary">计算</button> </form>`)
    } else {
        //设置按钮
        $('#rk-btn').attr("disabled", false)
        $('#srk-btn').attr("disabled", true)
        $("#form").html(`<form id="form">
        <div class="form-group">
            <label for="T">输入T：</label>
            <input type="number" class="form-control" id="T" aria-describedby="emailHelp" required>
        </div>
        <div class="form-group">
            <label for="p">输入p：</label>
            <input type="number" class="form-control" id="p" required>
        </div>
        <div class="form-group">
            <label for="Tc">输入Tc：</label>
            <input type="number" class="form-control" id="Tc" required>
        </div>
        <div class="form-group">
            <label for="Pc">输入Pc：</label>
            <input type="number" class="form-control" id="Pc" required>
        </div>
        <div class="form-group">
            <label for="Pc">输入w：</label>
            <input type="number" class="form-control" id="w" required>
        </div>
        <div class="form-group">
            <label for="count">输入迭代次数</label>
            <input type="number" class="form-control" id="count" required>
        </div>
        <button type="submit" id="submit_btn" class="btn btn-primary">计算</button>
    </form>`)
    }

    //计算
    $("#form").submit(() => {
        cal();
    })
}

function cal() {
    //R-K方程
    if (rk_selected) {
        console.log("提交");
        const R = 8.314;
        let T = eval($('#T').val());
        let p = eval($('#p').val());
        let Tc = eval($('#Tc').val());
        let Pc = eval($('#Pc').val());
        let count = Math.floor(eval($('#count').val()));
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
}