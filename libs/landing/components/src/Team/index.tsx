import React, { FC } from 'react'
import classNames from 'classnames'

import { Section } from '../Section'
import { DuckAvatar } from './DuckAvatar'
import styles from './Team.module.scss'

export const Team: FC = () => {
    const topDuckNameClassName = classNames(styles.name, styles['top-duck-name'])
    const topTextClassName = classNames(styles.text, styles['top-text'])

    const bottomDuckNameClassName = classNames(styles.name, styles['bottom-duck-name'])
    const bottomDuckTextClassName = classNames(styles.text, styles['bottom-duck-text'])

    return (
        <Section
            id="team"
            title="Meet our team"
            className={styles.wrapper}
        >
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles['top-content']}>
                        <div className={styles['top-ducks']}>
                            <div className={styles['top-duck']}>
                                <DuckAvatar name="willy" size="m" />
                                <div className={topDuckNameClassName}>ZomboWilly</div>
                            </div>

                            <div className={styles['top-duck']}>
                                <DuckAvatar name="donald" size="m" />
                                <div className={topDuckNameClassName}>ZomboDonald</div>
                            </div>
                        </div>

                        <p className={topTextClassName}>
                            Our star developers with experience in<br />
                            leading game studios, masters of their craft
                        </p>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles['bottom-duck']}>
                        <DuckAvatar name="master" />

                        <div className={bottomDuckNameClassName}>
                            ZomboMaster
                        </div>

                        <div className={bottomDuckTextClassName}>
                            Creative director, content <br />
                            manager and PR in one bottle
                        </div>
                    </div>

                    <div className={styles['bottom-duck']}>
                        <DuckAvatar name="chick" />

                        <div className={bottomDuckNameClassName}>
                            ZomboChick
                        </div>

                        <div className={bottomDuckTextClassName}>
                            The author of our monstrous design, you can <br />
                            see the level of her skill with your own eyes
                        </div>
                    </div>

                    <div className={styles['bottom-duck']}>
                        <DuckAvatar name="calypse" />

                        <div className={bottomDuckNameClassName}>
                            ZomboCalypse
                        </div>

                        <div className={bottomDuckTextClassName}>
                            God of numbers and <br />
                            strategy, handyman
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
