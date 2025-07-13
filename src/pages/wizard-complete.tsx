import Head from "next/head";
import { WizardProvider } from "~/components/wizard/WizardContext";
import { WizardComplete } from "~/components/wizard/WizardComplete";

export default function WizardCompletePage() {
  return (
    <>
      <Head>
        <title>Neue Fahndung erstellen - Fahndung A</title>
        <meta name="description" content="Erstellen Sie eine neue Fahndung mit dem Wizard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <WizardProvider>
        <WizardComplete />
      </WizardProvider>
    </>
  );
} 