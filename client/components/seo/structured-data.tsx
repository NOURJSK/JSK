import { organizationStructuredData, websiteStructuredData } from "@/lib/utils/seo-utils"

interface StructuredDataProps {
  data?: any
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={organizationStructuredData} />
      <script type="application/ld+json" dangerouslySetInnerHTML={websiteStructuredData} />
      {data && <script type="application/ld+json" dangerouslySetInnerHTML={data} />}
    </>
  )
}
