import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Actions,
    actions,
    AppDispatch,
    BodyParts,
    GameResultType,
    ReceiveAction,
    selectors,
    UserSkins
} from '@apps/bar/data'

export const useFakeActions = () => {
    const dispatch: AppDispatch = useDispatch()

    const player = useSelector(selectors.getPlayer)
    const playerAttacks = useSelector(selectors.getPlayerAttacks)
    const playerDefences = useSelector(selectors.getPlayerDefences)
    const playerHealth = useSelector(selectors.getPlayerHealth)

    const opponentHealth = useSelector(selectors.getOpponentHealth)

    const fakeRoundStart = useCallback(() => {
        const args: ReceiveAction = {
            type: Actions.RoundStart,
            data: {
                time: 10,
                player: {
                    health: playerHealth
                },
                opponent: {
                    health: opponentHealth
                }
            }
        }

        dispatch(actions.receiveAction(args))
    }, [dispatch, playerHealth, opponentHealth])

    const fakeSearch = useCallback(() => {
        setTimeout(() => {
            const args: ReceiveAction = {
                type: Actions.GameStart,
                data: {
                    gameId: 1,
                    rounds: 2,
                    opponent: {
                        id: 2,
                        nickname: 'devdammit',
                        skin: UserSkins.Default,
                        avatar: '/assets/avatar.png',
                        statistics: {
                            allGames: 20,
                            wonGames: 15
                        }
                    }
                }
            }

            dispatch(actions.receiveAction(args))
        }, 3000)

        setTimeout(fakeRoundStart, 4500)
    }, [dispatch, fakeRoundStart])

    const fakeRoundFinish = useCallback(() => {
        const opponentAttacks = [BodyParts.Head, BodyParts.Torso]
        const opponentDefences = [BodyParts.Head, BodyParts.Torso]

        const playerDamaged = opponentAttacks.filter(part => !playerDefences.includes(part))
        const playerDamage = playerDamaged.length * 10

        const opponentDamaged = playerAttacks.filter(part => !opponentDefences.includes(part))
        const opponentDamage = opponentDamaged.length * 10

        const args: ReceiveAction = {
            type: Actions.RoundFinish,
            data: {
                player: {
                    health: playerHealth - playerDamage,
                    damage: -playerDamage
                },
                opponent: {
                    health: opponentHealth - opponentDamage,
                    damage: -opponentDamage,
                    attacks: opponentAttacks,
                    defences: opponentDefences
                }
            }
        }

        dispatch(actions.receiveAction(args))
    }, [dispatch, playerHealth, opponentHealth, playerAttacks, playerDefences])

    const fakeAttack = useCallback(() => {
        dispatch(actions.attack())
    }, [dispatch])

    const fakeGameFinish = useCallback(() => {
        if (player) {
            const isWin = playerHealth > opponentHealth
            const { wonGames, allGames } = player.statistics

            const actionArgs: ReceiveAction = {
                type: Actions.GameFinish,
                data: {
                    type: isWin ? GameResultType.Victory : GameResultType.Lose,
                    profit: isWin ? 0.005 : -0.005,
                    statistics: {
                        wonGames: isWin ? wonGames + 1 : wonGames,
                        allGames: allGames + 1
                    }
                }
            }

            dispatch(actions.receiveAction(actionArgs))
        }
    }, [dispatch, player, playerHealth, opponentHealth])

    return {
        fakeSearch,
        fakeRoundStart,
        fakeRoundFinish,
        fakeAttack,
        fakeGameFinish
    }
}