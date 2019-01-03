/**
 * 初始化居民就诊历史管理详情对话框
 */
var PatientHistoryInfoDlg = {
    patientHistoryInfoData : {}
};

/**
 * 清除数据
 */
PatientHistoryInfoDlg.clearData = function() {
    this.patientHistoryInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PatientHistoryInfoDlg.set = function(key, val) {
    this.patientHistoryInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PatientHistoryInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
PatientHistoryInfoDlg.close = function() {
    parent.layer.close(window.parent.PatientHistory.layerIndex);
}

/**
 * 收集数据
 */
PatientHistoryInfoDlg.collectData = function() {
    this
    .set('id')
    .set('patientIdcard')
    .set('patientName')
    .set('patientSym')
    .set('patientDoctor')
    .set('patientMedicine')
    .set('patientHistoryDate')
    .set('takeprice');
}

/**
 * 提交添加
 */
PatientHistoryInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/patientHistory/add", function(data){
        Feng.success("添加成功!");
        window.parent.PatientHistory.table.refresh();
        PatientHistoryInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.patientHistoryInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
PatientHistoryInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/patientHistory/update", function(data){
        Feng.success("修改成功!");
        window.parent.PatientHistory.table.refresh();
        PatientHistoryInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.patientHistoryInfoData);
    ajax.start();
}

$(function() {

});
