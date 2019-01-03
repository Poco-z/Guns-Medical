/**
 * 初始化居民管理详情对话框
 */
var PatientInfoInfoDlg = {
    patientInfoInfoData : {}
};

/**
 * 清除数据
 */
PatientInfoInfoDlg.clearData = function() {
    this.patientInfoInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PatientInfoInfoDlg.set = function(key, val) {
    this.patientInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PatientInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
PatientInfoInfoDlg.close = function() {
    parent.layer.close(window.parent.PatientInfo.layerIndex);
}

/**
 * 收集数据
 */
PatientInfoInfoDlg.collectData = function() {
    this
    .set('paientIdcard')
    .set('paientName')
    .set('paientMoney');
}

/**
 * 提交添加
 */
PatientInfoInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/patientInfo/add", function(data){
        Feng.success("添加成功!");
        window.parent.PatientInfo.table.refresh();
        PatientInfoInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.patientInfoInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
PatientInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/patientInfo/update", function(data){
        Feng.success("修改成功!");
        window.parent.PatientInfo.table.refresh();
        PatientInfoInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.patientInfoInfoData);
    ajax.start();
}

$(function() {

});
