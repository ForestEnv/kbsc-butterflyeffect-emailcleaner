import client from '../lib/client';

export async function getUserActivityData(user_no: number) {
    console.log('사용자번호',user_no)
    const res = await client.get<RewardInfoResult>(`api/reward/userRewardInfo/${user_no}`);
    return [res.data.experience, res.data.miles];
}
export async function setMilege(user_no: number, miles: number) {
    console.log('사용자번호',user_no, miles)
    const res = await client.post(`api/reward/discount/${user_no}`, {miles});
    return res;
}

interface RewardInfoResult {
    experience: number;
    miles: number;
}