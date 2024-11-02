import { Achievement } from '../../model/achievement';

test('given: valid values for achievement, when: achievement is created, then: achievement is created with those values', () => {
    const achievement = new Achievement({
        title: 'starting out',
        description: 'post your first boulder',
        difficulty: 'easy',
    });

    expect(achievement.getTitle()).toEqual('starting out');
    expect(achievement.getDescription()).toEqual('post your first boulder');
    expect(achievement.getDifficulty()).toEqual('easy');
});

test('given: invalid title for achievement, when: achievement is created, then: error is thrown', () => {
    expect(() => {
        new Achievement({
            title: '',
            description: 'post your first boulder',
            difficulty: 'easy',
        });
    }).toThrow('Title cannot be empty.');
});

test('given: invalid description for achievement, when: achievement is created, then: error is thrown', () => {
    expect(() => {
        new Achievement({
            title: 'title',
            description: '',
            difficulty: 'easy',
        });
    }).toThrow('Description cannot be empty.');
});

test('given: invalid difficulty for achievement, when: achievement is created, then: error is thrown', () => {
    expect(() => {
        new Achievement({
            title: 'title',
            description: 'description',
            difficulty: '',
        });
    }).toThrow('Difficulty has to be easy, medium, hard or extreme.');
});
