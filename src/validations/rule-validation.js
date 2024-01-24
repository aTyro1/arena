import { faCarCrash } from '@fortawesome/free-solid-svg-icons';
import { Engine } from 'json-rules-engine';
import object from 'lodash/object';


export const processEngine = (fact, conditions) => {
    const engine = new Engine(conditions);
  
    return engine.run(fact)
        .then(results => {
          return results.events
        })
        .catch((e) => {
          console.error('Problem occured when processing the rules', e);
          return Promise.reject({ error: e.message });
        });
};
  
export const validateRuleset = async (facts, conditions) => {
  console.log(JSON.stringify(facts));
  facts['result']=facts.p1 * facts.p2;
  delete facts.p1;
  delete facts.p2;
  console.log(JSON.stringify(facts));
  console.log('condition from validator '+ JSON.stringify(conditions));
  conditions[0].conditions.all[0].fact='result';
  console.log('condition from validator '+ JSON.stringify(conditions));
  const result = await processEngine(facts, conditions);
  return result;
}