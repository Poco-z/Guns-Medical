package cn.stylefeng.guns.modular.system.model;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author zxx
 * @since 2018-12-29
 */
@TableName("doctor_point")
public class DoctorPoint extends Model<DoctorPoint> {

    private static final long serialVersionUID = 1L;

    private Integer id;
    @TableField("patient_idcard")
    private Integer patientIdcard;
    @TableField("patient_name")
    private String patientName;
    @TableField("doctor_name")
    private String doctorName;
    @TableField("point_date")
    private Date pointDate;
    @TableField("point_place")
    private String pointPlace;


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

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public Date getPointDate() {
        return pointDate;
    }

    public void setPointDate(Date pointDate) {
        this.pointDate = pointDate;
    }

    public String getPointPlace() {
        return pointPlace;
    }

    public void setPointPlace(String pointPlace) {
        this.pointPlace = pointPlace;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "DoctorPoint{" +
        ", id=" + id +
        ", patientIdcard=" + patientIdcard +
        ", patientName=" + patientName +
        ", doctorName=" + doctorName +
        ", pointDate=" + pointDate +
        ", pointPlace=" + pointPlace +
        "}";
    }
}
