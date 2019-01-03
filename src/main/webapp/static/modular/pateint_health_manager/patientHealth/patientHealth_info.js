/**
 * 初始化居民健康信息管理详情对话框
 */
var PatientHealthInfoDlg = {
    patientHealthInfoData : {}
};

/**
 * 清除数据
 */
PatientHealthInfoDlg.clearData = function() {
    this.patientHealthInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PatientHealthInfoDlg.set = function(key, val) {
    this.patientHealthInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PatientHealthInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
PatientHealthInfoDlg.close = function() {
    parent.layer.close(window.parent.PatientHealth.layerIndex);
}

/**
 * 收集数据
 */
PatientHealthInfoDlg.collectData = function() {
    this
    .set('id')
    .set('heartJump')
    .set('bloodPressure')
    .set('bloodOx')
    .set('pulse')
    .set('date')
    .set('patientIdcard')
    .set('patientName');
}

/**
 * 提交添加
 */
PatientHealthInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/patientHealth/add", function(data){
        Feng.success("添加成功!");
        window.parent.PatientHealth.table.refresh();
        PatientHealthInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.patientHealthInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
PatientHealthInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/patientHealth/update", function(data){
        Feng.success("修改成功!");
        window.parent.PatientHealth.table.refresh();
        PatientHealthInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.patientHealthInfoData);
    ajax.start();
}

$(function() {

});
