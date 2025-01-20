<template>
    <div>
        <el-form ref="formRef" size="mini" :model="formParams" :rules="formRules" label-width="100px">
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入名称" ></el-input>
            </el-form-item>
            <div class="flex-row   justify-between align-center">
                <div class="w-50">
                    <el-form-item label="热量" prop="energy">
                        <el-input v-model.trim="formParams.energy" placeholder="请输入热量" >
                            <template #append>千卡</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item label="蛋白质" prop="protein">
                        <el-input v-model.trim="formParams.protein" placeholder="请输入蛋白质" >
                            <template #append>克</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="flex-row   justify-between align-center">
                <div class="w-50">
                    <el-form-item label="脂肪" prop="fat">
                        <el-input v-model.trim="formParams.fat" placeholder="请输入脂肪" >
                            <template #append>克</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item label="碳水化合物" prop="carbohydrate">
                        <el-input v-model.trim="formParams.carbohydrate" placeholder="请输入碳水化合物" >
                            <template #append>克</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="flex-row   justify-between align-center">
                <div class="w-50">
                    <el-form-item label="膳食纤维" prop="dietary_fiber">
                        <el-input v-model.trim="formParams.dietary_fiber" placeholder="请输入膳食纤维" >
                            <template #append>克</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item label="钙" prop="calcium">
                        <el-input v-model.trim="formParams.calcium" placeholder="请输入钙" >
                            <template #append>毫克</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="flex-row   justify-between align-center">
                <div class="w-50">
                    <el-form-item label="铁" prop="iron">
                        <el-input v-model.trim="formParams.iron" placeholder="请输入铁" >
                            <template #append>毫克</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item label="锌" prop="zinc">
                        <el-input v-model.trim="formParams.zinc" placeholder="请输入锌" >
                            <template #append>毫克</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="flex-row   justify-between align-center">
                <div class="w-50">
                    <el-form-item label="硒" prop="selenium">
                        <el-input v-model.trim="formParams.selenium" placeholder="请输入硒" >
                            <template #append>微克</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="w-50">
                </div>
            </div>
            <div class="flex-row   justify-between align-center">
                <div class="w-50"></div>
                <div class="w-50"></div>
            </div>

            <el-form-item label="选择企业" prop="company_id">
                <el-select  class="w-100" clearable v-model="formParams.company_id" placeholder="请选择企业">
                    <el-option
                            v-for="item in companyMiniList"
                            :key="item.id"
                            :label="item.company_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef } from '@/hooks/nutriment/nutrimentCus/update.js'
    import  formRules from '@/hooks/nutriment/nutrimentCus/formRules.js'
    export default {
        name: "Update",
        props: {
            detail: {
                required: true,
                type: Object,
                default: ()=> {}
            }
        },
        setup(props, {emit}) {
            return {
                ...main(props, emit),
                formParams,
                formRef,
                formRules,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
