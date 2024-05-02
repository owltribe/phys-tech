
function Card({title, description, imageSrc }: { title: string, description: string, imageSrc: string }) {
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

export default function TargetAudience() {
  return (
    <div className="py-16">
      <div className="xl:container m-auto px-6 text-gray-500 md:px-12">
        <div>
          <h2 className="mt-4 text-2xl font-bold text-gray-700 md:text-4xl">
            Для кого мы предназначены
          </h2>
          <p className="my-8 text-gray-600 text-balance">
            Такой подход не только экономит время, но и открывает новые возможности для сотрудничества и открытий,
            связывая искателей услуг с широким спектром научной экспертизы и ресурсов.
          </p>
        </div>
        <div className="mt-16 grid divide-x divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 sm:grid-cols-2 lg:divide-y-0">
          <Card
            title='Организации'
            description='Университеты, научно-исследовательские институты и лаборатории, желающие предоставить свои услуги.'
            imageSrc='https://cdn-icons-png.flaticon.com/512/4341/4341155.png'
          />
          <Card
            title='Клиенты'
            description='Частные лица, предприятия или другие организации, нуждающиеся в научных услугах.'
            imageSrc='https://cdn-icons-png.flaticon.com/512/4341/4341131.png'
          />
        </div>
      </div>
    </div>
  )
}