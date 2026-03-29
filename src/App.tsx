import { FormProvider } from './context/FormContext';
import { FormWizard } from './components/FormWizard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Ethics Review Application</h1>
        <p>Multi-step form with validation and auto-save</p>
      </header>
      <main>
        <FormProvider>
          <FormWizard />
        </FormProvider>
      </main>
    </div>
  );
}

export default App;
