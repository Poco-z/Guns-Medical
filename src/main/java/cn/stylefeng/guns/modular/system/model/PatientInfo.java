package cn.stylefeng.guns.modular.system.model;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-29
 */
@TableName("patient_info")
public class PatientInfo extends Model<PatientInfo> {

    private static final long serialVersionUID = 1L;

    @TableId("paient_idcard")
    private Integer paientIdcard;
    @TableField("paient_name")
    private String paientName;
    @TableField("paient_money")
    private String paientMoney;


    public Integer getPaientIdcard() {
        return paientIdcard;
    }

    public void setPaientIdcard(Integer paientIdcard) {
        this.paientIdcard = paientIdcard;
    }

    public String getPaientName() {
        return paientName;
    }

    public void setPaientName(String paientName) {
        this.paientName = paientName;
    }

    public String getPaientMoney() {
        return paientMoney;
    }

    public void setPaientMoney(String paientMoney) {
        this.paientMoney = paientMoney;
    }

    @Override
    protected Serializable pkVal() {
        return this.paientIdcard;
    }

    @Override
    public String toString() {
        return "PatientInfo{" +
        ", paientIdcard=" + paientIdcard +
        ", paientName=" + paientName +
        ", paientMoney=" + paientMoney +
        "}";
    }
}
