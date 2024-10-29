import { BoulderProblem } from '../../model/boulderProblem';

test('given: valid values for boulderProblem, when: boulderProblem is created, then: boulderProblem is created with those values', () => {
    const boulderProblem = new BoulderProblem({
        grade: 'V5',
    });

    expect(boulderProblem.getGrade()).toEqual('V5');
});
