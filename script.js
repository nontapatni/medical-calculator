// กำหนดค่าคงที่สำหรับเวลาในหน่วยมิลลิวินาที
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_IN_GESTATION = 280; // 40 สัปดาห์

document.getElementById('ga-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // 1. ดึงค่า LMP จาก Input
    const lmpDateString = document.getElementById('lmp-date').value;
    
    if (!lmpDateString) {
        alert("กรุณาป้อนวัน LMP");
        return;
    }

    // แปลง LMP เป็น Object Date
    const lmp = new Date(lmpDateString);
    
    // กำหนดวันที่ตรวจ คือ 'วันนี้' (สามารถเปลี่ยนเป็นวันที่ผู้ใช้เลือกได้)
    const currentDate = new Date();
    
    // เนื่องจาก Date object ใน JS มักมีปัญหา Timezone 
    // เราจะใช้การลบค่า Time Stamp (มิลลิวินาที) แทน
    
    // 2. คำนวณจำนวนวันทั้งหมดตั้งแต่วัน LMP จนถึงวันนี้
    // ค่า .getTime() คือจำนวนมิลลิวินาทีตั้งแต่ปี 1970
    const timeDifference = currentDate.getTime() - lmp.getTime();
    
    // ป้องกันกรณีที่ LMP เป็นวันในอนาคต
    if (timeDifference < 0) {
        alert("วัน LMP ไม่ควรเป็นวันในอนาคต");
        return;
    }

    const totalDays = Math.floor(timeDifference / MS_PER_DAY);
    
    // 3. แปลงเป็น สัปดาห์ (Weeks) และ วัน (Days)
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    // 4. คำนวณ EDD (วันครบกำหนดคลอด)
    // EDD = LMP + 280 วัน
    const edd = new Date(lmp.getTime() + (DAYS_IN_GESTATION * MS_PER_DAY));

    // 5. แสดงผลลัพธ์
    document.getElementById('ga-value').textContent = `${weeks} สัปดาห์ ${days} วัน`;
    document.getElementById('edd-value').textContent = edd.toLocaleDateString('th-TH'); // แสดงผลตามรูปแบบวันที่ไทย
});