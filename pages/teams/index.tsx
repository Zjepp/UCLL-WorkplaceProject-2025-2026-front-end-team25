import Header from '@components/header'
import TeamOverview from '@components/teams/TeamOverview'
import TeamService from '@services/TeamService'
import Head from 'next/head'
import useSWR from 'swr'
import type { Team } from '@types'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getServerSideProps = async () => {
  const teamResponse = await TeamService.getAll()
  const teams = await teamResponse.json()
  return { props: { teams } }
}
const Teams: React.FC = ({ teams }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1>Teams</h1>

        <section className="mt-5">
          {teams && <TeamOverview teams={teams} />}
        </section>
      </main>
    </>
  )
}

export default Teams
