function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">

      <h1 className="text-5xl font-bold text-green-800 mb-6">
        Rent Farm Equipment Easily
      </h1>

      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        किसानों के लिए ट्रैक्टर, हार्वेस्टर और अन्य कृषि उपकरण
        किराए पर उपलब्ध।
      </p>

      <div className="space-x-4">

        <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800">
          Find Equipment
        </button>

        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600">
          Become Producer
        </button>

      </div>

    </div>
  );
}

export default Hero;