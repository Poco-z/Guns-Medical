/**
 * 药物管理管理初始化
 */
var MedicineInfo = {
    id: "MedicineInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
MedicineInfo.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '药物编号', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '药物名称', field: 'medicineName', visible: true, align: 'center', valign: 'middle'},
            {title: '药物价格', field: 'medicinePrice', visible: true, align: 'center', valign: 'middle'},
            {title: '药物疗效', field: 'medicineValue', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
MedicineInfo.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        MedicineInfo.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加药物管理
 */
MedicineInfo.openAddMedicineInfo = function () {
    var index = layer.open({
        type: 2,
        title: '添加药物管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/medicineInfo/medicineInfo_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看药物管理详情
 */
MedicineInfo.openMedicineInfoDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '药物管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/medicineInfo/medicineInfo_update/' + MedicineInfo.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除药物管理
 */
MedicineInfo.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/medicineInfo/delete", function (data) {
            Feng.success("删除成功!");
            MedicineInfo.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("medicineInfoId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询药物管理列表
 */
MedicineInfo.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    MedicineInfo.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = MedicineInfo.initColumn();
    var table = new BSTable(MedicineInfo.id, "/medicineInfo/list", defaultColunms);
    table.setPaginationType("client");
    MedicineInfo.table = table.init();
});
