export default function TargetAudienceCard({title, description, imageSrc }: { title: string, description: string, imageSrc: string }) {
  return (
    <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
      <div className="relative space-y-8 py-12 p-8">
        <img src={imageSrc} className="w-12" alt={title}/>
        <div className="space-y-2">
          <h5 className="text-xl font-medium text-gray-700 transition group-hover:text-primary">
            {title}
          </h5>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}