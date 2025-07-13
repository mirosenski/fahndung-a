import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { WizardProvider } from '~/components/wizard/WizardContext';
import { Wizard } from '~/components/wizard/WizardComplete';

const WizardDemoPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wizard Demo - Fahndungssystem</title>
        <meta name="description" content="Demo des neuen Wizards für Fahndungserstellung" />
      </Head>
      
      <WizardProvider>
        <Wizard />
      </WizardProvider>
    </>
  );
};

export default WizardDemoPage; 