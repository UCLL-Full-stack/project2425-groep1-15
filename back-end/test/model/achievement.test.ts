import { Achievement } from '../../model/achievement';

test('given: valid values for achievement, when: achievement is created, then: achievement is created with those values', () => {
    const achievement = new Achievement({
        title: 'starting out',
        description: 'post your first boulder',
        difficulity: 'easy',
    });

    expect(achievement.getTitle()).toEqual('starting out');
    expect(achievement.getDescription()).toEqual('post your first boulder');
    expect(achievement.getDifficulty()).toEqual('easy');
});
