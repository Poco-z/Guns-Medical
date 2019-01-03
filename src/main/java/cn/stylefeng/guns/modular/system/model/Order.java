package cn.stylefeng.guns.modular.system.model;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author zxx
 * @since 2018-12-29
 */
public class Order extends Model<Order> {

    private static final long serialVersionUID = 1L;

    private Integer id;
    @TableField("patient_idcard")
    private Integer patientIdcard;
    @TableField("patient_name")
    private String patientName;
    @TableField("order_time")
    private Date orderTime;
    @TableField("order_place")
    private String orderPlace;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPatientIdcard() {
        return patientIdcard;
    }

    public void setPatientIdcard(Integer patientIdcard) {
        this.patientIdcard = patientIdcard;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getOrderPlace() {
        return orderPlace;
    }

    public void setOrderPlace(String orderPlace) {
        this.orderPlace = orderPlace;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Order{" +
        ", id=" + id +
        ", patientIdcard=" + patientIdcard +
        ", patientName=" + patientName +
        ", orderTime=" + orderTime +
        ", orderPlace=" + orderPlace +
        "}";
    }
}
