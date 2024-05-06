import ControlForm from './ControlForm';

export default function FormRules({
  handleBack,
  isLoading,
}: {
  handleBack: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="w-full rounded-2xl bg-yellow-100 p-5">
      <h2 className="font-bold mb-2">Điều khoản</h2>
      <div className="w-full p-5 mb-5 bg-gray-50 rounded-lg">
        <div className="mb-4">
          <h3 className="font-bold">Định Nghĩa:</h3>
          <p>
            Bạn, Tôi, Người Nộp Đơn hoặc Người Nhận Nuôi: Người hoặc những người
            nộp đơn để nhận nuôi một con vật.
          </p>
          <p>
            Chúng Tôi, Petopia, hoặc Website: Tổ chức hỗ trợ quá trình nhận
            nuôi.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Điều Kiện và Quy Trình Nộp Đơn:</h3>
          <p>1. Tôi cam kết rằng tôi đã đủ 18 tuổi trở lên.</p>
          <p>
            2. Tôi xác nhận tất cả các thành viên trong hộ gia đình đồng ý nhận
            nuôi một con vật mới.
          </p>
          <p>
            3. Tôi cam kết thông tin mà tôi đã cung cấp là chính xác và nhận ra
            rằng bất kỳ sự biến tướng nào cũng sẽ dẫn đến việc mất quyền lợi
            nhận nuôi con vật.
          </p>
          <p>
            4. Tôi cam kết rằng tôi đang điền đơn nhận nuôi cho bản thân mình và
            không phải cho ai khác.
          </p>
          <p>
            5. Tôi hiểu rằng việc điền đơn nhận nuôi trên trang web không đảm
            bảo việc nhận nuôi.
          </p>
          <p>
            6. Tôi hiểu rằng chủ của thú cưng có toàn quyền quyết định tôi có
            được nhận nuôi hay không.
          </p>
        </div>
        <div className="mb-4">
          <input type="checkbox" id="agreeCheckbox" required />
          <label htmlFor="agreeCheckbox" className="ml-2">
            Tôi đồng ý với các điều khoản nhận nuôi.
          </label>
        </div>
      </div>
      {/* Controller */}
      <ControlForm
        handleBack={handleBack}
        handleNext={() => {}}
        type={4}
        isLoading={isLoading}
      />
    </div>
  );
}
