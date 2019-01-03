/**
 * 初始化药物管理详情对话框
 */
var MedicineInfoInfoDlg = {
    medicineInfoInfoData : {}
};

/**
 * 清除数据
 */
MedicineInfoInfoDlg.clearData = function() {
    this.medicineInfoInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MedicineInfoInfoDlg.set = function(key, val) {
    this.medicineInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MedicineInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
MedicineInfoInfoDlg.close = function() {
    parent.layer.close(window.parent.MedicineInfo.layerIndex);
}

/**
 * 收集数据
 */
MedicineInfoInfoDlg.collectData = function() {
    this
    .set('id')
    .set('medicineName')
    .set('medicinePrice')
    .set('medicineValue');
}

/**
 * 提交添加
 */
MedicineInfoInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/medicineInfo/add", function(data){
        Feng.success("添加成功!");
        window.parent.MedicineInfo.table.refresh();
        MedicineInfoInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.medicineInfoInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
MedicineInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/medicineInfo/update", function(data){
        Feng.success("修改成功!");
        window.parent.MedicineInfo.table.refresh();
        MedicineInfoInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.medicineInfoInfoData);
    ajax.start();
}

$(function() {

});
