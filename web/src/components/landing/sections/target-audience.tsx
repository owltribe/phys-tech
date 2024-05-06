import TargetAudienceCard from "@/components/landing/_components/target-audience-card";


export default function TargetAudience() {
  return (
    <section className="py-16">
      <div className="xl:container m-auto px-6 text-gray-500 md:px-12">
        <div>
          <h2 className="mt-4 text-center text-2xl font-bold text-gray-700 md:text-4xl text-pretty">
            Для кого мы <span className="font-bold text-blue-600">предназначены</span>
          </h2>
          <p className="my-8 text-center text-gray-600 text-balance">
            Такой подход не только экономит время, но и открывает новые возможности для сотрудничества и открытий,
            связывая искателей услуг с широким спектром научной экспертизы и ресурсов.
          </p>
        </div>
        <div className="mt-16 grid divide-x divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 sm:grid-cols-2 lg:divide-y-0">
          <TargetAudienceCard
            title='Организации'
            description='Университеты, научно-исследовательские институты и лаборатории, желающие предоставить свои услуги.'
            imageSrc='https://cdn-icons-png.flaticon.com/512/4341/4341155.png'
          />
          <TargetAudienceCard
            title='Клиенты'
            description='Частные лица, предприятия или другие организации, нуждающиеся в научных услугах.'
            imageSrc='https://cdn-icons-png.flaticon.com/512/4341/4341131.png'
          />
        </div>
      </div>
    </section>
  )
}