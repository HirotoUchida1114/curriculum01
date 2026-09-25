function BookCard({ title, author, rating, comment }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-500 text-sm">著者: {author}</p>
      <p className="text-yellow-500">{rating}</p>
      <p className="text-gray-600 mt-2 text-sm">{comment}</p>
    </div>
  );
}

export default BookCard;
