/**
 * 居民就诊历史管理管理初始化
 */
var PatientHistory = {
    id: "PatientHistoryTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
PatientHistory.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '编号', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '居民身份证', field: 'patientIdcard', visible: true, align: 'center', valign: 'middle'},
            {title: '居民姓名', field: 'patientName', visible: true, align: 'center', valign: 'middle'},
            {title: '症状', field: 'patientSym', visible: true, align: 'center', valign: 'middle'},
            {title: '主治医生', field: 'patientDoctor', visible: true, align: 'center', valign: 'middle'},
            {title: '治疗药物', field: 'patientMedicine', visible: true, align: 'center', valign: 'middle'},
            {title: '就诊日期', field: 'patientHistoryDate', visible: true, align: 'center', valign: 'middle'},
            {title: '花费', field: 'takeprice', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
PatientHistory.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        PatientHistory.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加居民就诊历史管理
 */
PatientHistory.openAddPatientHistory = function () {
    var index = layer.open({
        type: 2,
        title: '添加居民就诊历史管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/patientHistory/patientHistory_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看居民就诊历史管理详情
 */
PatientHistory.openPatientHistoryDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '居民就诊历史管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/patientHistory/patientHistory_update/' + PatientHistory.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除居民就诊历史管理
 */
PatientHistory.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/patientHistory/delete", function (data) {
            Feng.success("删除成功!");
            PatientHistory.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("patientHistoryId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询居民就诊历史管理列表
 */
PatientHistory.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    PatientHistory.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = PatientHistory.initColumn();
    var table = new BSTable(PatientHistory.id, "/patientHistory/list", defaultColunms);
    table.setPaginationType("client");
    PatientHistory.table = table.init();
});
