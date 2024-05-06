export default function Card({
  icon,
  title,
  description,
  img,
}: {
  icon: string | JSX.Element;
  title: string;
  description: string;
  img?: string;
}) {
  return (
    <div className="p-8 py-10 sm:p-10 rounded-3xl bg-white border border-gray-100 bg-opacity-50 shadow-2xl shadow-gray-600/10">
      <div className="space-y-16">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50"
        >
          <span className="font-bold text-blue-600">
            {icon}
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl 2xl:text-2xl font-semibold text-gray-800 transition">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
        {img && (
          <img
            src={img}
            className="w-16"
            width="512"
            height="512"
            alt="burger illustration"
          />
        )}
      </div>
    </div>
  )
}