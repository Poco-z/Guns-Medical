package cn.stylefeng.guns.modular.patient.controller;

import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import cn.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import cn.stylefeng.guns.modular.system.model.PatientInfo;
import cn.stylefeng.guns.modular.patient.service.IPatientInfoService;

/**
 * 居民管理控制器
 *
 * @author fengshuonan
 * @Date 2018-12-29 15:57:18
 */
@Controller
@RequestMapping("/patientInfo")
public class PatientInfoController extends BaseController {

    private String PREFIX = "/patient/patientInfo/";

    @Autowired
    private IPatientInfoService patientInfoService;

    /**
     * 跳转到居民管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "patientInfo.html";
    }

    /**
     * 跳转到添加居民管理
     */
    @RequestMapping("/patientInfo_add")
    public String patientInfoAdd() {
        return PREFIX + "patientInfo_add.html";
    }

    /**
     * 跳转到修改居民管理
     */
    @RequestMapping("/patientInfo_update/{patientInfoId}")
    public String patientInfoUpdate(@PathVariable Integer patientInfoId, Model model) {
        PatientInfo patientInfo = patientInfoService.selectById(patientInfoId);
        model.addAttribute("item",patientInfo);
        LogObjectHolder.me().set(patientInfo);
        return PREFIX + "patientInfo_edit.html";
    }

    /**
     * 获取居民管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return patientInfoService.selectList(null);
    }

    /**
     * 新增居民管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(PatientInfo patientInfo) {
        patientInfoService.insert(patientInfo);
        return SUCCESS_TIP;
    }

    /**
     * 删除居民管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer patientInfoId) {
        patientInfoService.deleteById(patientInfoId);
        return SUCCESS_TIP;
    }

    /**
     * 修改居民管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(PatientInfo patientInfo) {
        patientInfoService.updateById(patientInfo);
        return SUCCESS_TIP;
    }

    /**
     * 居民管理详情
     */
    @RequestMapping(value = "/detail/{patientInfoId}")
    @ResponseBody
    public Object detail(@PathVariable("patientInfoId") Integer patientInfoId) {
        return patientInfoService.selectById(patientInfoId);
    }
}
