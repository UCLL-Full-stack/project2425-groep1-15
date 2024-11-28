import { BoulderProblem } from '../../model/boulderProblem';
import { ClimbingGym } from '../../model/climbingGym';

const gym1 = new ClimbingGym({ location: 'Herent', gymName: 'Boulder One' });
test('given: valid values for boulderProblem, when: boulderProblem is created, then: boulderProblem is created with those values', () => {
    const boulderProblem = new BoulderProblem({
        grade: 'V5',
        gym: gym1,
    });

    expect(boulderProblem.getGrade()).toEqual('V5');
});

test('given: invalid values for boulderProblem, when: boulderProblem is created, then: error is thrown', () => {
    expect(() => {
        new BoulderProblem({
            grade: '',
            gym: gym1,
        });
    }).toThrow('Grade cannot be empty.');
});
