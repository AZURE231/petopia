import Image from 'next/image';

export default function page() {
  return (
    <div>
      <div className="container w-5/6 p-5 mx-auto shadow-2xl rounded-2xl">
        <div className="flex mb-10 relative">
          <div className="relative h-52 w-52">
            <Image
              src={'/img/cat-pet-detail.jpg'}
              alt="Picture of the author"
              layout="fill" // required
              objectFit="cover" // change to suit your needs
              className="rounded-full" // just an example
            />
          </div>
          <h1 className="font-bold text-5xl ml-5">Huynh Vo Tuan</h1>
        </div>
        <div className="md:px-10">
          <div className="flex flex-col py-2">
            <div className="flex flex-row">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Số điện thoại
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="0987654321"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Gmail
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="huynhvotuan@gmail.com"
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Địa chỉ
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="123/4/5 Quang Trung, Phu Nhuan, HCM"
                readOnly
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Tên tài khoản
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="123/4/5 Quang Trung, Phu Nhuan, HCM"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container w-5/6 p-5 mx-auto">
        <div>Thú cưng của bạn</div>
      </div>
    </div>
  );
}
