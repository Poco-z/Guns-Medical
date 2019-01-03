/**
 * 初始化医生预约详情对话框
 */
var DoctorPointInfoDlg = {
    doctorPointInfoData : {}
};

/**
 * 清除数据
 */
DoctorPointInfoDlg.clearData = function() {
    this.doctorPointInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DoctorPointInfoDlg.set = function(key, val) {
    this.doctorPointInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DoctorPointInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
DoctorPointInfoDlg.close = function() {
    parent.layer.close(window.parent.DoctorPoint.layerIndex);
}

/**
 * 收集数据
 */
DoctorPointInfoDlg.collectData = function() {
    this
    .set('id')
    .set('patientIdcard')
    .set('patientName')
    .set('doctorName')
    .set('pointDate')
    .set('pointPlace');
}

/**
 * 提交添加
 */
DoctorPointInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/doctorPoint/add", function(data){
        Feng.success("添加成功!");
        window.parent.DoctorPoint.table.refresh();
        DoctorPointInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.doctorPointInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
DoctorPointInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/doctorPoint/update", function(data){
        Feng.success("修改成功!");
        window.parent.DoctorPoint.table.refresh();
        DoctorPointInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.doctorPointInfoData);
    ajax.start();
}

$(function() {

});
