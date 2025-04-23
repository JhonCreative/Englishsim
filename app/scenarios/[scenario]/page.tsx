import { DialogInterface } from "@/components/dialog-interface"
import { getScenarioData } from "@/lib/scenarios"
import { notFound } from "next/navigation"

export default function ScenarioPage({
  params,
}: {
  params: { scenario: string }
}) {
  const scenarioData = getScenarioData(params.scenario)

  if (!scenarioData) {
    notFound()
  }

  return <DialogInterface scenario={scenarioData} />
}
