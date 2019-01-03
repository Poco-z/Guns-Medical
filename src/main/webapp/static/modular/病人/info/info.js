/**
 * 病人管理初始化
 */
var Info = {
    id: "InfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Info.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '', field: 'userId', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'userName', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'userIdcard', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'userPassword', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Info.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Info.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加病人
 */
Info.openAddInfo = function () {
    var index = layer.open({
        type: 2,
        title: '添加病人',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/info/info_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看病人详情
 */
Info.openInfoDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '病人详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/info/info_update/' + Info.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除病人
 */
Info.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/info/delete", function (data) {
            Feng.success("删除成功!");
            Info.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("infoId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询病人列表
 */
Info.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Info.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Info.initColumn();
    var table = new BSTable(Info.id, "/info/list", defaultColunms);
    table.setPaginationType("client");
    Info.table = table.init();
});
