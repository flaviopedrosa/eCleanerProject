<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon :name="isEditMode ? 'edit' : 'person_add'" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEditMode ? $t('pages.clientEdit.title') : $t('forms.cliente.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ isEditMode ? $t('forms.cliente.editSubtitle') : $t('forms.cliente.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- Layout Desktop: Cards separados -->
      <div class="desktop-layout gt-sm">
        <!-- Dados Pessoais -->
        <q-card flat bordered class="q-mt-md q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="person" class="q-mr-sm" />
              {{ $t('forms.cliente.sections.personalData') }}
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-3">
                <div class="text-center foto-cliente-container">
                  <div class="text-subtitle2 q-mb-sm">{{ $t('forms.cliente.fields.foto') }}</div>
                  <q-avatar size="120px" class="q-mb-md">
                    <img v-if="form.fotoPreview" :src="form.fotoPreview" alt="Foto do cliente"
                      style="object-fit: cover;" />
                    <q-icon v-else name="person" size="60px" color="grey-6" />
                  </q-avatar>
                  <div>
                    <q-file v-model="form.foto" accept="image/*" max-file-size="5242880"
                      @update:model-value="onFotoSelecionada" style="display: none" ref="fotoInput" />
                    <q-btn color="primary" icon="photo_camera"
                      :label="form.fotoPreview ? 'Alterar Foto' : 'Adicionar Foto'" size="sm" outline
                      @click="$refs.fotoInput.pickFiles()" class="q-mb-xs full-width" />
                    <q-btn v-if="form.fotoPreview" color="negative" icon="delete" label="Remover" size="sm" flat
                      @click="removerFoto" class="full-width" />
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-9">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input v-model="form.nome" :label="$t('forms.cliente.fields.nome') + ' *'" filled lazy-rules
                      :rules="[val => !!val || $t('forms.validation.required')]" />
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input v-model="form.sobrenome" :label="$t('forms.cliente.fields.sobrenome') + ' *'" filled
                      lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input v-model="form.email" :label="$t('forms.cliente.fields.email') + ' *'" filled type="email"
                      lazy-rules :rules="[
                        val => !!val || $t('forms.validation.required'),
                        val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('forms.validation.email')
                      ]" />
                  </div>

                  <div class="col-12 col-md-3">
                    <q-input v-model="form.telefone" :label="$t('forms.cliente.fields.telefone')" filled
                      mask="(##) ####-####" />
                  </div>

                  <div class="col-12 col-md-3">
                    <q-input v-model="form.celular" :label="$t('forms.cliente.fields.celular') + ' *'" filled
                      mask="(##) #####-####" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Endereços Desktop -->
        <q-card flat bordered class="q-mt-md q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="location_on" class="q-mr-sm" />
              {{ $t('forms.cliente.sections.addresses') }}
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-2">
                <q-input v-model="form.endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'" filled
                  mask="#####-###" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]"
                  @blur="buscarEnderecoPorCep(form.endereco.cep, 'cliente')" />
              </div>

              <div class="col-12 col-md-8">
                <q-input v-model="form.endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'" filled
                  lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
              </div>

              <div class="col-12 col-md-2">
                <q-input v-model="form.endereco.numero" :label="$t('forms.cliente.address.fields.numero') + ' *'" filled
                  lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
              </div>

              <div class="col-12 col-md-4">
                <q-input v-model="form.endereco.complemento" :label="$t('forms.cliente.address.fields.complemento')"
                  filled />
              </div>

              <div class="col-12 col-md-4">
                <q-input v-model="form.endereco.bairro" :label="$t('forms.cliente.address.fields.bairro') + ' *'" filled
                  lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
              </div>

              <div class="col-12 col-md-4">
                <q-input v-model="form.endereco.cidade" :label="$t('forms.cliente.address.fields.cidade') + ' *'" filled
                  lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
              </div>

              <div class="col-12 col-md-4">
                <q-input v-model="form.endereco.estado" :label="$t('forms.cliente.address.fields.estado') + ' *'" filled
                  lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Imóveis Desktop -->
        <q-card flat bordered class="q-mt-md q-mb-md">
          <q-expansion-item v-model="imoveisExpanded" expand-separator>
            <template v-slot:header>
              <q-item-section>
                <q-item-label class="text-h6 text-primary">
                  <q-icon name="home" class="q-mr-sm" />
                  {{ $t('forms.cliente.sections.properties') }}
                </q-item-label>
                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                  <q-item-label v-if="!imoveisExpanded" caption>
                    {{ form.imoveis.length }} imóvel(s)
                  </q-item-label>
                </transition>
              </q-item-section>
              <q-item-section side>
                <q-btn color="primary" icon="add_home" :label="$t('forms.cliente.property.addButton')" flat size="sm"
                  @click.stop="adicionarNovoImovel" />
              </q-item-section>
            </template>
            <q-card-section>
              <div v-if="form.imoveis.length === 0" class="text-center text-grey-6 q-py-lg">
                <q-icon name="home_work" size="48px" class="q-mb-md" />
                <div class="text-body1">{{ $t('forms.cliente.property.noProperties') }}</div>
                <div class="text-caption">{{ $t('forms.cliente.property.clickToAdd') }}</div>
              </div>

              <div v-for="(imovel, index) in form.imoveis" :key="imovel.id" class="q-mb-md">
                <q-card flat bordered class="bg-grey-1">
                  <q-card-section class="q-pb-none">
                    <div class="row items-center q-mb-sm">
                      <div class="text-subtitle2">{{ $t('forms.cliente.property.title', [index + 1]) }}</div>
                      <q-space />
                      <q-btn flat round color="negative" icon="delete" size="sm" @click="removerImovel(index)" />
                    </div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-3">
                        <q-input v-model="imovel.totalComodos"
                          :label="$t('forms.cliente.property.fields.totalComodos') + ' *'" filled type="number" min="1"
                          lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12 col-md-3">
                        <q-input v-model="imovel.numeroQuartos"
                          :label="$t('forms.cliente.property.fields.numeroQuartos') + ' *'" filled type="number" min="0"
                          lazy-rules :rules="[val => val >= 0 || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12 col-md-3">
                        <q-input v-model="imovel.numeroBanheiros"
                          :label="$t('forms.cliente.property.fields.numeroBanheiros') + ' *'" filled type="number"
                          min="1" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12 col-md-3">
                        <q-input v-model="imovel.areaTotal"
                          :label="$t('forms.cliente.property.fields.areaTotal') + ' *'" filled type="number" min="1"
                          suffix="m²" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12">
                        <q-input v-model="imovel.observacao" :label="$t('forms.cliente.property.fields.observacao')"
                          filled type="textarea" rows="2" />
                      </div>

                      <div class="col-12">
                        <div class="text-subtitle2 text-primary q-mb-sm q-mt-md">
                          <q-icon name="location_on" class="q-mr-xs" />
                          {{ $t('forms.cliente.property.address.title') }}
                        </div>
                      </div>

                      <div class="col-12 q-mb-md">
                        <q-checkbox v-model="imovel.mesmoEnderecoCliente"
                          :label="$t('forms.cliente.property.address.sameAsClient')" color="primary"
                          @update:model-value="(value) => copiarEnderecoCliente(index, value)" />
                      </div>

                      <div class="col-12 col-md-2">
                        <q-input v-model="imovel.endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'"
                          filled mask="#####-###" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]"
                          @blur="buscarEnderecoPorCep(imovel.endereco.cep, 'imovel', index)" />
                      </div>

                      <div class="col-12 col-md-6">
                        <q-input v-model="imovel.endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'"
                          filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12 col-md-2">
                        <q-input v-model="imovel.endereco.numero"
                          :label="$t('forms.cliente.address.fields.numero') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12 col-md-2">
                        <q-input v-model="imovel.endereco.complemento"
                          :label="$t('forms.cliente.address.fields.complemento')" filled />
                      </div>

                      <div class="col-12 col-md-4">
                        <q-input v-model="imovel.endereco.bairro"
                          :label="$t('forms.cliente.address.fields.bairro') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12 col-md-4">
                        <q-input v-model="imovel.endereco.cidade"
                          :label="$t('forms.cliente.address.fields.cidade') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <div class="col-12 col-md-4">
                        <q-input v-model="imovel.endereco.estado"
                          :label="$t('forms.cliente.address.fields.estado') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />
                      </div>

                      <!-- Seção de Imagens do Imóvel -->
                      <div class="col-12">
                        <div class="text-subtitle2 text-primary q-mb-sm q-mt-md">
                          <q-icon name="photo_camera" class="q-mr-xs" />
                          {{ $t('forms.cliente.property.images.title') }}
                        </div>

                        <div class="row q-gutter-sm q-mb-md">
                          <q-btn color="primary" icon="photo_library"
                            :label="$t('forms.cliente.property.images.chooseFile')" size="sm" outline
                            @click="$refs[`imagemInput${index}`][0].pickFiles()" />
                          <q-btn color="primary" icon="photo_camera"
                            :label="$t('forms.cliente.property.images.takePhoto')" size="sm" outline
                            @click="$refs[`cameraInput${index}`][0].pickFiles()" />
                        </div>

                        <q-file :ref="`imagemInput${index}`" v-model="imovel.imagemTemp" accept="image/*"
                          max-file-size="5242880" multiple
                          @update:model-value="(files) => onImagensSelecionadas(files, index)" style="display: none" />

                        <q-file :ref="`cameraInput${index}`" v-model="imovel.cameraTemp" accept="image/*"
                          capture="environment" max-file-size="5242880"
                          @update:model-value="(file) => onImagemCamera(file, index)" style="display: none" />

                        <div v-if="imovel.imagens && imovel.imagens.length > 0" class="q-mt-md">
                          <div class="text-caption text-grey-7 q-mb-sm">
                            {{ $t('forms.cliente.property.images.addedImages', [imovel.imagens.length]) }}
                          </div>

                          <div class="row q-gutter-sm">
                            <div v-for="(imagem, imgIndex) in imovel.imagens" :key="imgIndex"
                              class="col-6 col-sm-4 col-md-3">
                              <q-card flat bordered class="imagem-preview">
                                <q-img :src="imagem.preview || imagem.url"
                                  :alt="imagem.nome || `Imagem ${imgIndex + 1}`" ratio="1" class="rounded-borders"
                                  style="height: 100px">
                                  <div class="absolute-top-right q-pa-xs">
                                    <q-btn round dense color="negative" icon="close" size="xs"
                                      @click="removerImagemImovel(index, imgIndex)" />
                                  </div>
                                </q-img>

                                <q-card-section class="q-pa-xs">
                                  <q-input v-model="imagem.descricao"
                                    :placeholder="$t('forms.cliente.property.images.description')" dense filled
                                    class="text-caption" />
                                  <div class="text-caption text-grey-7 q-mt-xs">
                                    {{ $t('forms.cliente.property.images.uploadDate', [formatarData(imagem.dataUpload)])
                                    }}
                                  </div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>

                        <div v-else class="text-center text-grey-6 q-py-md">
                          <q-icon name="photo" size="32px" class="q-mb-sm" />
                          <div class="text-caption">{{ $t('forms.cliente.property.images.noImages') }}</div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-card-section>
          </q-expansion-item>
        </q-card>

        <!-- Observações Desktop -->
        <q-card flat bordered class="q-mt-md q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="notes" class="q-mr-sm" />
              {{ $t('forms.cliente.sections.observacoes') }}
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input v-model="form.observacoes" :label="$t('forms.cliente.fields.observacoes')" filled
                  type="textarea" rows="4" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Layout Mobile/Tablet: Carrossel -->
      <div class="mobile-layout lt-md">
        <q-card flat bordered>
          <!-- Indicador de Progresso -->
          <q-card-section class="q-pb-sm">
            <div class="row items-center justify-between q-mb-sm">
              <div class="text-h6 text-primary">
                {{ secoes[secaoAtual].titulo }}
              </div>
              <div class="text-caption text-grey-6">
                {{ secaoAtual + 1 }}/{{ secoes.length }}
              </div>
            </div>
            <q-linear-progress :value="(secaoAtual + 1) / secoes.length" color="primary" size="4px" />
          </q-card-section>

          <!-- Carrossel de Seções -->
          <q-carousel v-model="secaoAtual" transition-prev="slide-right" transition-next="slide-left" swipeable animated
            control-color="primary" height="auto" class="rounded-borders">

            <!-- Seção 1: Dados Pessoais -->
            <q-carousel-slide :name="0" class="q-pa-none">
              <q-card-section>
                <div class="text-h6 text-primary q-mb-md">
                  <q-icon name="person" class="q-mr-sm" />
                  {{ $t('forms.cliente.sections.personalData') }}
                </div>

                <div class="q-gutter-md">
                  <!-- Foto do Cliente -->
                  <div class="text-center q-mb-lg foto-cliente-container">
                    <div class="text-subtitle2 q-mb-sm">{{ $t('forms.cliente.fields.foto') }}</div>
                    <q-avatar size="100px" class="q-mb-md">
                      <img v-if="form.fotoPreview" :src="form.fotoPreview" alt="Foto do cliente"
                        style="object-fit: cover;" />
                      <q-icon v-else name="person" size="50px" color="grey-6" />
                    </q-avatar>
                    <div>
                      <q-btn color="primary" icon="photo_camera"
                        :label="form.fotoPreview ? 'Alterar Foto' : 'Adicionar Foto'" size="sm" outline
                        @click="$refs.fotoInputMobile.pickFiles()" class="q-mb-xs" />
                      <q-btn v-if="form.fotoPreview" color="negative" icon="delete" label="Remover" size="sm" flat
                        @click="removerFoto" class="q-ml-sm" />
                    </div>
                  </div>

                  <q-input v-model="form.nome" :label="$t('forms.cliente.fields.nome') + ' *'" filled lazy-rules
                    :rules="[val => !!val || $t('forms.validation.required')]" />

                  <q-input v-model="form.sobrenome" :label="$t('forms.cliente.fields.sobrenome') + ' *'" filled
                    lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                  <q-input v-model="form.email" :label="$t('forms.cliente.fields.email') + ' *'" filled type="email"
                    lazy-rules :rules="[
                      val => !!val || $t('forms.validation.required'),
                      val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('forms.validation.email')
                    ]" />

                  <q-input v-model="form.celular" :label="$t('forms.cliente.fields.celular') + ' *'" filled
                    mask="(##) #####-####" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                  <q-input v-model="form.telefone" :label="$t('forms.cliente.fields.telefone')" filled
                    mask="(##) ####-####" />

                  <!-- Input de arquivo para mobile (escondido) -->
                  <q-file v-model="form.foto" accept="image/*" max-file-size="5242880"
                    @update:model-value="onFotoSelecionada" style="display: none" ref="fotoInputMobile" />
                </div>
              </q-card-section>
            </q-carousel-slide>

            <!-- Seção 2: Endereços -->
            <q-carousel-slide :name="1" class="q-pa-none">
              <q-card-section>
                <div class="text-h6 text-primary q-mb-md">
                  <q-icon name="location_on" class="q-mr-sm" />
                  {{ $t('forms.cliente.sections.addresses') }}
                </div>

                <div class="q-gutter-md">
                  <q-input v-model="form.endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'" filled
                    mask="#####-###" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]"
                    @blur="buscarEnderecoPorCep(form.endereco.cep, 'cliente')" />

                  <q-input v-model="form.endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'" filled
                    lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                  <q-input v-model="form.endereco.numero" :label="$t('forms.cliente.address.fields.numero') + ' *'"
                    filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                  <q-input v-model="form.endereco.complemento" :label="$t('forms.cliente.address.fields.complemento')"
                    filled />

                  <q-input v-model="form.endereco.bairro" :label="$t('forms.cliente.address.fields.bairro') + ' *'"
                    filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                  <q-input v-model="form.endereco.cidade" :label="$t('forms.cliente.address.fields.cidade') + ' *'"
                    filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                  <q-input v-model="form.endereco.estado" :label="$t('forms.cliente.address.fields.estado') + ' *'"
                    filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>
              </q-card-section>
            </q-carousel-slide>

            <!-- Seção 3: Imóveis -->
            <q-carousel-slide :name="2" class="q-pa-none">
              <q-card-section>
                <div class="row items-center justify-between q-mb-md">
                  <div class="text-h6 text-primary">
                    <q-icon name="home" class="q-mr-sm" />
                    {{ $t('forms.cliente.sections.properties') }}
                  </div>
                  <q-btn color="primary" icon="add_home" :label="$t('forms.cliente.property.addButton')" flat size="sm"
                    @click="adicionarNovoImovel" />
                </div>

                <div v-if="form.imoveis.length === 0" class="text-center text-grey-6 q-py-lg">
                  <q-icon name="home_work" size="48px" class="q-mb-md" />
                  <div class="text-body1">{{ $t('forms.cliente.property.noProperties') }}</div>
                  <div class="text-caption">{{ $t('forms.cliente.property.clickToAdd') }}</div>
                </div>

                <div v-for="(imovel, index) in form.imoveis" :key="imovel.id" class="q-mb-md">
                  <q-card flat bordered class="bg-grey-1">
                    <q-card-section class="q-pb-none">
                      <div class="row items-center q-mb-sm">
                        <div class="text-subtitle2">{{ $t('forms.cliente.property.title', [index + 1]) }}</div>
                        <q-space />
                        <q-btn flat round color="negative" icon="delete" size="sm" @click="removerImovel(index)" />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <div class="q-gutter-md">
                        <q-input v-model="imovel.totalComodos"
                          :label="$t('forms.cliente.property.fields.totalComodos') + ' *'" filled type="number" min="1"
                          lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.numeroQuartos"
                          :label="$t('forms.cliente.property.fields.numeroQuartos') + ' *'" filled type="number" min="0"
                          lazy-rules :rules="[val => val >= 0 || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.numeroBanheiros"
                          :label="$t('forms.cliente.property.fields.numeroBanheiros') + ' *'" filled type="number"
                          min="1" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.areaTotal"
                          :label="$t('forms.cliente.property.fields.areaTotal') + ' *'" filled type="number" min="1"
                          suffix="m²" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.observacao" :label="$t('forms.cliente.property.fields.observacao')"
                          filled type="textarea" rows="7" />

                        <div class="text-subtitle2 text-primary q-mb-sm q-mt-md">
                          <q-icon name="location_on" class="q-mr-xs" />
                          {{ $t('forms.cliente.property.address.title') }}
                        </div>

                        <q-checkbox v-model="imovel.mesmoEnderecoCliente"
                          :label="$t('forms.cliente.property.address.sameAsClient')" color="primary"
                          @update:model-value="(value) => copiarEnderecoCliente(index, value)" />

                        <q-input v-model="imovel.endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'"
                          filled mask="#####-###" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]"
                          @blur="buscarEnderecoPorCep(imovel.endereco.cep, 'imovel', index)" />

                        <q-input v-model="imovel.endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'"
                          filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.endereco.numero"
                          :label="$t('forms.cliente.address.fields.numero') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.endereco.complemento"
                          :label="$t('forms.cliente.address.fields.complemento')" filled />

                        <q-input v-model="imovel.endereco.bairro"
                          :label="$t('forms.cliente.address.fields.bairro') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.endereco.cidade"
                          :label="$t('forms.cliente.address.fields.cidade') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />

                        <q-input v-model="imovel.endereco.estado"
                          :label="$t('forms.cliente.address.fields.estado') + ' *'" filled lazy-rules
                          :rules="[val => !!val || $t('forms.validation.required')]" />

                        <!-- Seção de Imagens do Imóvel -->
                        <div class="text-subtitle2 text-primary q-mb-sm q-mt-md">
                          <q-icon name="photo_camera" class="q-mr-xs" />
                          {{ $t('forms.cliente.property.images.title') }}
                        </div>

                        <!-- Botões para adicionar imagens -->
                        <div class="row q-gutter-sm q-mb-md">
                          <q-btn color="primary" icon="photo_library"
                            :label="$t('forms.cliente.property.images.chooseFile')" size="sm" outline
                            @click="$refs[`imagemInput${index}`][0].pickFiles()" />
                          <q-btn color="primary" icon="photo_camera"
                            :label="$t('forms.cliente.property.images.takePhoto')" size="sm" outline
                            @click="$refs[`cameraInput${index}`][0].pickFiles()" />
                        </div>

                        <!-- Input de arquivo para galeria (escondido) -->
                        <q-file :ref="`imagemInput${index}`" v-model="imovel.imagemTemp" accept="image/*"
                          max-file-size="5242880" multiple
                          @update:model-value="(files) => onImagensSelecionadas(files, index)" style="display: none" />

                        <!-- Input de arquivo para câmera (escondido) -->
                        <q-file :ref="`cameraInput${index}`" v-model="imovel.cameraTemp" accept="image/*"
                          capture="environment" max-file-size="5242880"
                          @update:model-value="(file) => onImagemCamera(file, index)" style="display: none" />

                        <!-- Lista de imagens adicionadas -->
                        <div v-if="imovel.imagens && imovel.imagens.length > 0" class="q-mt-md">
                          <div class="text-caption text-grey-7 q-mb-sm">
                            {{ $t('forms.cliente.property.images.addedImages', [imovel.imagens.length]) }}
                          </div>

                          <div class="row q-gutter-sm">
                            <div v-for="(imagem, imgIndex) in imovel.imagens" :key="imgIndex" class="col-6 col-sm-4">
                              <q-card flat bordered class="imagem-preview">
                                <q-img :src="imagem.preview || imagem.url"
                                  :alt="imagem.nome || `Imagem ${imgIndex + 1}`" ratio="1" class="rounded-borders"
                                  style="height: 80px">
                                  <div class="absolute-top-right q-pa-xs">
                                    <q-btn round dense color="negative" icon="close" size="xs"
                                      @click="removerImagemImovel(index, imgIndex)" />
                                  </div>
                                </q-img>

                                <!-- Campo para descrição da imagem -->
                                <q-card-section class="q-pa-xs">
                                  <q-input v-model="imagem.descricao"
                                    :placeholder="$t('forms.cliente.property.images.description')" dense filled
                                    class="text-caption" />
                                  <div class="text-caption text-grey-7 q-mt-xs">
                                    {{ $t('forms.cliente.property.images.uploadDate', [formatarData(imagem.dataUpload)])
                                    }}
                                  </div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>

                        <!-- Mensagem quando não há imagens -->
                        <div v-else class="text-center text-grey-6 q-py-md">
                          <q-icon name="photo" size="32px" class="q-mb-sm" />
                          <div class="text-caption">{{ $t('forms.cliente.property.images.noImages') }}</div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-card-section>
            </q-carousel-slide>

            <!-- Seção 4: Observações -->
            <q-carousel-slide :name="3" class="q-pa-none">
              <q-card-section>
                <div class="text-h6 text-primary q-mb-md">
                  <q-icon name="notes" class="q-mr-sm" />
                  {{ $t('forms.cliente.sections.observacoes') }}
                </div>

                <q-input v-model="form.observacoes" :label="$t('forms.cliente.fields.observacoes')" filled
                  type="textarea" rows="6" />
              </q-card-section>
            </q-carousel-slide>
          </q-carousel>

          <!-- Navegação do Carrossel -->
          <q-card-section class="q-pt-sm">
            <div class="row justify-between">
              <!-- Botão Anterior - oculto no primeiro slide -->
              <q-btn v-show="secaoAtual > 0" flat :label="$t('forms.buttons.previous')" color="primary"
                icon="chevron_left" @click="voltarSecao" />

              <!-- Espaçador quando botão anterior está oculto -->
              <div v-show="secaoAtual === 0"></div>

              <!-- Botão Próximo - aparece até a penúltima seção -->
              <q-btn v-show="secaoAtual < secoes.length - 1" flat :label="$t('forms.buttons.next')" color="primary"
                icon-right="chevron_right" @click="proximaSecao" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Botões de Ação -->
      <div class="row q-gutter-md justify-end q-mt-lg">
        <q-btn flat :label="$t('forms.buttons.cancel')" @click="voltarParaListagem" />
        <q-btn color="primary" :label="isEditMode ? $t('pages.clientEdit.buttons.save') : $t('forms.buttons.save')"
          type="submit" :loading="loading" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { Cliente } from '../core/domain/entities/cliente'
import { Endereco } from '../core/domain/entities/endereco'
import { Imovel } from '../core/domain/entities/imovel'
import { gerarGuid } from '../core/domain/utils/guid'
import { ClienteRepository } from 'src/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from 'src/core/infrastructure/repositories/imovelRepository'

export default {
  name: 'ClienteCadastroPage',

  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const clienteRepository = new ClienteRepository()
    const imovelRepository = new ImovelRepository()

    // Verifica se está em modo de edição
    const isEditMode = computed(() => !!route.params.id)
    const loading = ref(false)
    const cliente = ref(null)

    // Função auxiliar para criar um novo endereço vazio
    function enderecoVazio() {
      return {
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    }

    // Função auxiliar para criar um novo imóvel vazio
    function imovelVazio() {
      return {
        id: 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9), // ID temporário para reatividade
        totalComodos: '',
        numeroQuartos: '',
        numeroBanheiros: '',
        areaTotal: '',
        observacao: '',
        mesmoEnderecoCliente: false,
        endereco: enderecoVazio(),
        imagens: [], // Array para armazenar imagens
        imagemTemp: null, // Arquivo temporário para galeria
        cameraTemp: null // Arquivo temporário para câmera
      }
    }

    // Estado do formulário
    const form = ref({
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      celular: '',
      foto: null,
      fotoPreview: null,
      observacoes: '',
      endereco: enderecoVazio(),
      imoveis: []
    })

    // Estado das seções colapsáveis
    const imoveisExpanded = ref(true)

    // Estado do carrossel mobile
    const secaoAtual = ref(0)
    const secoes = ref([
      { id: 0, titulo: t('forms.cliente.sections.personalData'), icone: 'person' },
      { id: 1, titulo: t('forms.cliente.sections.addresses'), icone: 'location_on' },
      { id: 2, titulo: t('forms.cliente.sections.properties'), icone: 'home' },
      { id: 3, titulo: t('forms.cliente.sections.observacoes'), icone: 'notes' }
    ])

    // Funções de validação para cada seção
    const validarDadosPessoais = () => {
      const errors = []

      if (!form.value.nome?.trim()) {
        errors.push(t('forms.cliente.fields.nome'))
      }

      if (!form.value.sobrenome?.trim()) {
        errors.push(t('forms.cliente.fields.sobrenome'))
      }

      if (!form.value.email?.trim()) {
        errors.push(t('forms.cliente.fields.email'))
      } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.value.email)) {
        errors.push(t('forms.cliente.fields.email') + ' (formato inválido)')
      }

      if (!form.value.celular?.trim()) {
        errors.push(t('forms.cliente.fields.celular'))
      }

      return errors
    }

    const validarEnderecos = () => {
      const errors = []

      if (!form.value.endereco) {
        errors.push('Endereço é obrigatório')
        return errors
      }

      const endereco = form.value.endereco
      if (!endereco.cep?.trim()) {
        errors.push('CEP é obrigatório')
      }
      if (!endereco.rua?.trim()) {
        errors.push('Rua é obrigatória')
      }
      if (!endereco.numero?.trim()) {
        errors.push('Número é obrigatório')
      }
      if (!endereco.bairro?.trim()) {
        errors.push('Bairro é obrigatório')
      }
      if (!endereco.cidade?.trim()) {
        errors.push('Cidade é obrigatória')
      }
      if (!endereco.estado?.trim()) {
        errors.push('Estado é obrigatório')
      }

      return errors
    }

    const validarImoveis = () => {
      const errors = []

      // Imóveis são opcionais, mas se adicionados devem estar completos
      form.value.imoveis.forEach((imovel, index) => {
        if (!imovel.totalComodos) {
          errors.push(`Imóvel ${index + 1}: Total de cômodos é obrigatório`)
        }
        if (imovel.numeroQuartos === '' || imovel.numeroQuartos < 0) {
          errors.push(`Imóvel ${index + 1}: Número de quartos é obrigatório`)
        }
        if (!imovel.numeroBanheiros) {
          errors.push(`Imóvel ${index + 1}: Número de banheiros é obrigatório`)
        }
        if (!imovel.areaTotal) {
          errors.push(`Imóvel ${index + 1}: Área total é obrigatória`)
        }

        // Validar endereço do imóvel
        const endereco = imovel.endereco
        if (!endereco.cep?.trim()) {
          errors.push(`Imóvel ${index + 1}: CEP do endereço é obrigatório`)
        }
        if (!endereco.rua?.trim()) {
          errors.push(`Imóvel ${index + 1}: Rua do endereço é obrigatória`)
        }
        if (!endereco.numero?.trim()) {
          errors.push(`Imóvel ${index + 1}: Número do endereço é obrigatório`)
        }
        if (!endereco.bairro?.trim()) {
          errors.push(`Imóvel ${index + 1}: Bairro do endereço é obrigatório`)
        }
        if (!endereco.cidade?.trim()) {
          errors.push(`Imóvel ${index + 1}: Cidade do endereço é obrigatória`)
        }
        if (!endereco.estado?.trim()) {
          errors.push(`Imóvel ${index + 1}: Estado do endereço é obrigatório`)
        }
      })

      return errors
    }

    const validarObservacoes = () => {
      // Observações são opcionais, sempre válidas
      return []
    }

    const validarSecaoAtual = () => {
      let errors = []

      switch (secaoAtual.value) {
        case 0: // Dados Pessoais
          errors = validarDadosPessoais()
          break
        case 1: // Endereços
          errors = validarEnderecos()
          break
        case 2: // Imóveis
          errors = validarImoveis()
          break
        case 3: // Observações
          errors = validarObservacoes()
          break
      }

      if (errors.length > 0) {
        $q.notify({
          type: 'negative',
          message: 'Por favor, corrija os seguintes campos:',
          caption: errors.join('<br>'),
          html: true,
          timeout: 5000,
          position: 'top-right'
        })
        return false
      }

      return true
    }

    // Funções de navegação do carrossel
    const proximaSecao = () => {
      // Valida a seção atual antes de prosseguir
      if (!validarSecaoAtual()) {
        return // Para a execução se a validação falhar
      }

      if (secaoAtual.value < secoes.value.length - 1) {
        secaoAtual.value++
      }
      // Removido: não submete mais automaticamente no último slide
      // O usuário deve usar o botão "Salvar" na parte inferior
    }

    const voltarSecao = () => {
      if (secaoAtual.value > 0) {
        secaoAtual.value--
      }
    }

    // Métodos para manipulação de imóveis
    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    function removerImovel(index) {
      form.value.imoveis.splice(index, 1)
    }

    // Função para copiar endereço do cliente para o imóvel
    function copiarEnderecoCliente(imovelIndex, usarEnderecoCliente) {
      if (usarEnderecoCliente && form.value.endereco) {
        // Copia o endereço do cliente
        const enderecoCliente = form.value.endereco
        form.value.imoveis[imovelIndex].endereco = {
          cep: enderecoCliente.cep,
          rua: enderecoCliente.rua,
          numero: enderecoCliente.numero,
          complemento: enderecoCliente.complemento,
          bairro: enderecoCliente.bairro,
          cidade: enderecoCliente.cidade,
          estado: enderecoCliente.estado
        }
      } else if (!usarEnderecoCliente) {
        // Limpa o endereço do imóvel quando desmarca
        form.value.imoveis[imovelIndex].endereco = enderecoVazio()
      }
    }

    // Funções para gerenciar imagens dos imóveis
    async function onImagensSelecionadas(files, imovelIndex) {
      if (!files || files.length === 0) return

      try {
        const imovel = form.value.imoveis[imovelIndex]
        if (!imovel.imagens) {
          imovel.imagens = []
        }

        for (const file of files) {
          // Valida o tamanho do arquivo (5MB máximo)
          if (file.size > 5242880) {
            $q.notify({
              type: 'negative',
              message: t('forms.validation.fileTooLarge', [file.name]),
              timeout: 3000,
              position: 'top-right'
            })
            continue
          }

          // Comprime e adiciona a imagem
          const imagemComprimida = await comprimirImagem(file, 800, 600, 0.8)

          const novaImagem = {
            id: gerarGuid(),
            nome: file.name,
            preview: imagemComprimida,
            descricao: '',
            tipo: file.type,
            tamanho: file.size,
            dataUpload: new Date().toISOString()
          }

          imovel.imagens.push(novaImagem)

          // Debug: log da imagem adicionada
          console.log('Imagem adicionada ao imóvel:', novaImagem)
          console.log('Total de imagens no imóvel agora:', imovel.imagens.length)
        }

        $q.notify({
          type: 'positive',
          message: t('forms.cliente.property.images.imagesAdded', [files.length]),
          timeout: 2000,
          position: 'top-right'
        })

        // Limpa o input temporário
        imovel.imagemTemp = null

      } catch (error) {
        console.error('Erro ao processar imagens:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.validation.imageProcessError'),
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    async function onImagemCamera(file, imovelIndex) {
      if (!file) return

      try {
        const imovel = form.value.imoveis[imovelIndex]
        if (!imovel.imagens) {
          imovel.imagens = []
        }

        // Valida o tamanho do arquivo
        if (file.size > 5242880) {
          $q.notify({
            type: 'negative',
            message: t('forms.validation.fileTooLarge', [file.name]),
            timeout: 3000,
            position: 'top-right'
          })
          return
        }

        // Comprime e adiciona a imagem da câmera
        const imagemComprimida = await comprimirImagem(file, 800, 600, 0.8)

        const novaImagem = {
          id: gerarGuid(),
          nome: file.name || `camera_${Date.now()}.jpg`,
          preview: imagemComprimida,
          descricao: '',
          tipo: file.type || 'image/jpeg',
          tamanho: file.size,
          dataUpload: new Date().toISOString()
        }

        imovel.imagens.push(novaImagem)

        $q.notify({
          type: 'positive',
          message: t('forms.cliente.property.images.photoTaken'),
          timeout: 2000,
          position: 'top-right'
        })

        // Limpa o input temporário
        imovel.cameraTemp = null

      } catch (error) {
        console.error('Erro ao processar foto da câmera:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.validation.imageProcessError'),
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    function removerImagemImovel(imovelIndex, imagemIndex) {
      form.value.imoveis[imovelIndex].imagens.splice(imagemIndex, 1)

      $q.notify({
        type: 'positive',
        message: t('forms.cliente.property.images.imageRemoved'),
        timeout: 2000,
        position: 'top-right'
      })
    }

    function formatarData(data) {
      if (!data) return '-'
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(new Date(data))
    }

    // Função para buscar endereço pelo CEP usando a API ViaCEP
    async function buscarEnderecoPorCep(cep, tipo, indice = null) {
      if (!cep || cep.length < 8) return

      // Remove caracteres não numéricos
      const cepLimpo = cep.replace(/\D/g, '')

      if (cepLimpo.length !== 8) return

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()

        if (data.erro) {
          $q.notify({
            type: 'negative',
            message: t('forms.validation.invalidCep'),
            timeout: 3000,
            position: 'top-right'
          })
          return
        }

        // Preenche os campos conforme o tipo de endereço
        if (tipo === 'cliente') {
          form.value.endereco.rua = data.logradouro || ''
          form.value.endereco.bairro = data.bairro || ''
          form.value.endereco.cidade = data.localidade || ''
          form.value.endereco.estado = data.uf || ''
        } else if (tipo === 'imovel' && indice !== null) {
          form.value.imoveis[indice].endereco.rua = data.logradouro || ''
          form.value.imoveis[indice].endereco.bairro = data.bairro || ''
          form.value.imoveis[indice].endereco.cidade = data.localidade || ''
          form.value.imoveis[indice].endereco.estado = data.uf || ''
        }

        $q.notify({
          type: 'positive',
          message: t('forms.validation.cepFound'),
          timeout: 2000,
          position: 'top-right'
        })

      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.validation.cepError'),
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    // Função para carregar dados do cliente em modo de edição
    async function carregarCliente() {
      if (!isEditMode.value) return

      loading.value = true
      try {
        // Carrega dados reais do repositório
        const clienteData = await clienteRepository.getById(route.params.id)

        if (!clienteData) {
          throw new Error('Cliente não encontrado')
        }

        cliente.value = clienteData

        // Preenche o formulário com os dados do cliente
        form.value.nome = clienteData.Nome
        form.value.sobrenome = clienteData.Sobrenome
        form.value.email = clienteData.Email
        form.value.telefone = clienteData.Telefone || ''
        form.value.celular = clienteData.Celular
        form.value.observacoes = clienteData.Observacoes || ''

        // Preenche foto se houver
        if (clienteData.Foto) {
          form.value.fotoPreview = clienteData.Foto
        }

        // Preenche endereço único (suporte para migração dos dados antigos)
        if (clienteData.Endereco) {
          // Dados novos com endereço único
          form.value.endereco = {
            cep: clienteData.Endereco.Cep || '',
            rua: clienteData.Endereco.Logradouro || '',
            numero: clienteData.Endereco.Numero || '',
            complemento: clienteData.Endereco.Complemento || '',
            bairro: clienteData.Endereco.Bairro || '',
            cidade: clienteData.Endereco.Cidade || '',
            estado: clienteData.Endereco.Estado || ''
          }
        } else if (clienteData.Enderecos && clienteData.Enderecos.length > 0) {
          // Migração de dados antigos - pega o primeiro endereço
          const endereco = clienteData.Enderecos[0]
          form.value.endereco = {
            cep: endereco.Cep || '',
            rua: endereco.Logradouro || '',
            numero: endereco.Numero || '',
            complemento: endereco.Complemento || '',
            bairro: endereco.Bairro || '',
            cidade: endereco.Cidade || '',
            estado: endereco.Estado || ''
          }
        } else {
          form.value.endereco = enderecoVazio()
        }

        // Preenche imóveis com dados completos
        if (clienteData.Imoveis && clienteData.Imoveis.length > 0) {
          form.value.imoveis = clienteData.Imoveis.map(imovel => ({
            id: imovel.Id, // PRESERVA o ID original do imóvel na edição
            totalComodos: imovel.TotalComodos?.toString() || '',
            numeroQuartos: imovel.NumeroQuartos?.toString() || '',
            numeroBanheiros: imovel.NumeroBanheiros?.toString() || '',
            areaTotal: imovel.AreaTotal?.toString() || '',
            observacao: imovel.Observacao || '',
            mesmoEnderecoCliente: false, // Sempre inicia desmarcado na edição
            endereco: {
              cep: imovel.Endereco?.Cep || '',
              rua: imovel.Endereco?.Logradouro || '',
              numero: imovel.Endereco?.Numero || '',
              complemento: imovel.Endereco?.Complemento || '',
              bairro: imovel.Endereco?.Bairro || '',
              cidade: imovel.Endereco?.Cidade || '',
              estado: imovel.Endereco?.Estado || ''
            },
            imagens: imovel.Imagens || [], // Inclui as imagens do imóvel
            imagemTemp: null,
            cameraTemp: null
          }))
        } else {
          form.value.imoveis = []
        }

      } catch (error) {
        console.error('Erro ao carregar cliente:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.clientEdit.messages.loadError'),
          timeout: 5000,
          position: 'top-right'
        })
        cliente.value = null
      } finally {
        loading.value = false
      }
    }

    // Função para voltar à listagem
    const voltarParaListagem = () => {
      router.push('/clientes')
    }

    // Inicialização
    onMounted(() => {
      if (isEditMode.value) {
        carregarCliente()
      } else {
        // Modo de criação - adiciona um endereço vazio por padrão
        form.value.enderecos = [enderecoVazio()]
      }
    })

    const onSubmit = async () => {
      try {
        const clienteInstance = new Cliente(
          form.value.nome,
          form.value.sobrenome,
          form.value.email,
          form.value.celular,
          form.value.telefone
        )

        // Se estiver editando, preserva o ID
        if (isEditMode.value && cliente.value) {
          clienteInstance.Id = cliente.value.Id
        }

        // Define a foto se houver
        if (form.value.fotoPreview) {
          clienteInstance.definirFoto(form.value.fotoPreview)
        }

        // Adiciona o endereço ao cliente (se houver)
        if (form.value.endereco && form.value.endereco.cep.trim()) {
          const endereco = new Endereco(
            'Principal', // descricao
            form.value.endereco.rua, // logradouro
            form.value.endereco.numero,
            form.value.endereco.cep,
            form.value.endereco.bairro,
            form.value.endereco.cidade,
            form.value.endereco.estado,
            'Brasil', // pais
            form.value.endereco.complemento // complemento
          )
          clienteInstance.definirEndereco(endereco)
        }

        clienteInstance.Observacoes = form.value.observacoes

        // PRIMEIRO: Salva o cliente no repositório para garantir que ele tenha um ID
        console.log('Salvando cliente primeiro...', clienteInstance)
        const clienteSalvo = await clienteRepository.save(clienteInstance)
        console.log('Cliente salvo com ID:', clienteSalvo.Id)

        // SEGUNDO: Gerencia os imóveis do cliente
        const imoveisCriados = []

        // Em modo de edição, primeiro remove todos os imóveis existentes
        if (isEditMode.value && cliente.value) {
          console.log('Modo edição: removendo imóveis antigos do cliente...')
          await imovelRepository.deleteByDono(cliente.value.Id)
        }

        for (const imovelForm of form.value.imoveis) {
          // Só adiciona imóveis que tenham dados básicos preenchidos
          if (imovelForm.totalComodos && imovelForm.numeroBanheiros && imovelForm.endereco.cep.trim()) {
            const enderecoImovel = new Endereco(
              'Imóvel', // descricao
              imovelForm.endereco.rua, // logradouro
              imovelForm.endereco.numero,
              imovelForm.endereco.cep,
              imovelForm.endereco.bairro,
              imovelForm.endereco.cidade,
              imovelForm.endereco.estado,
              'Brasil' // pais
            )

            // Debug: verificar imagens antes de criar o imóvel
            console.log('Imagens no formulário do imóvel:', imovelForm.imagens)
            console.log('Número de imagens:', imovelForm.imagens?.length || 0)

            // Cria o imóvel (novo ou atualizado)
            const imovel = new Imovel(
              parseInt(imovelForm.totalComodos),
              parseInt(imovelForm.numeroQuartos) || 0,
              parseInt(imovelForm.numeroBanheiros),
              parseFloat(imovelForm.areaTotal) || 0,
              enderecoImovel,
              clienteSalvo, // Usa o cliente salvo com ID
              imovelForm.observacao,
              imovelForm.imagens || [] // Inclui as imagens do formulário
            )

            // Se estiver editando e o imóvel tem ID original (GUID válido), preserva o ID
            if (isEditMode.value && imovelForm.id && typeof imovelForm.id === 'string' &&
              imovelForm.id.includes('-') && imovelForm.id.length > 30) {
              imovel.Id = imovelForm.id
              console.log('ID preservado na edição:', imovelForm.id)
            } else {
              console.log('Novo imóvel criado com ID:', imovel.Id)
            }

            // Debug: verificar imagens após criar o imóvel
            console.log('Imagens no imóvel criado:', imovel.Imagens)
            console.log('Total de imagens no imóvel:', imovel.totalImagens)

            // Salva o imóvel no repositório
            const imovelSalvo = await imovelRepository.save(imovel)
            console.log('Imóvel criado e salvo:', imovelSalvo)
            console.log('ID do cliente no imóvel:', imovelSalvo.Dono.Id)

            // Adiciona o imóvel ao cliente
            clienteSalvo.adicionarImovel(imovelSalvo)
            imoveisCriados.push(imovelSalvo)
          }
        }

        // TERCEIRO: Se foram criados imóveis, atualiza o cliente com a lista de imóveis
        if (imoveisCriados.length > 0) {
          console.log('Atualizando cliente com', imoveisCriados.length, 'imóveis...')
          await clienteRepository.save(clienteSalvo)
        }

        // Simular sucesso
        $q.notify({
          type: 'positive',
          message: isEditMode.value ? t('messages.updateSuccess') : t('messages.saveSuccess'),
          timeout: 3000,
          position: 'top-right'
        })

        // Verificar espaço do localStorage após salvar
        setTimeout(() => {
          verificarEspacoLocalStorage()
        }, 1000)

        // Voltar para a listagem após sucesso
        setTimeout(() => {
          router.push('/clientes')
        }, 1500)

      } catch (error) {
        console.error(isEditMode.value ? 'Erro ao atualizar cliente:' : 'Erro ao criar cliente:', error)

        $q.notify({
          type: 'negative',
          message: isEditMode.value ? t('messages.updateError') : t('messages.saveError'),
          timeout: 5000,
          position: 'top-right'
        })
      }
    }

    // Funções para manipular foto
    const comprimirImagem = (file, maxWidth = 300, maxHeight = 300, quality = 0.7) => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        img.onload = () => {
          // Calcular dimensões mantendo proporção
          let { width, height } = img

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height
              height = maxHeight
            }
          }

          canvas.width = width
          canvas.height = height

          // Desenhar imagem redimensionada
          ctx.drawImage(img, 0, 0, width, height)

          // Converter para base64 comprimido
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
          resolve(compressedDataUrl)
        }

        img.src = URL.createObjectURL(file)
      })
    }

    const onFotoSelecionada = async (file) => {
      if (!file) return

      // Validar tamanho do arquivo (5MB)
      if (file.size > 5242880) {
        $q.notify({
          type: 'negative',
          message: 'Arquivo muito grande. Tamanho máximo: 5MB',
          timeout: 3000,
          position: 'top-right'
        })
        return
      }

      // Validar tipo do arquivo
      if (!file.type.startsWith('image/')) {
        $q.notify({
          type: 'negative',
          message: 'Apenas arquivos de imagem são permitidos',
          timeout: 3000,
          position: 'top-right'
        })
        return
      }

      try {
        // Comprimir a imagem
        const compressedImage = await comprimirImagem(file)

        // Verificar tamanho após compressão
        const sizeInBytes = Math.round((compressedImage.length * 3) / 4)
        console.log(`Imagem original: ${(file.size / 1024).toFixed(1)}KB, Comprimida: ${(sizeInBytes / 1024).toFixed(1)}KB`)

        form.value.fotoPreview = compressedImage

        $q.notify({
          type: 'positive',
          message: `Foto comprimida e carregada (${(sizeInBytes / 1024).toFixed(1)}KB)`,
          timeout: 2000,
          position: 'top-right'
        })
      } catch (error) {
        console.error('Erro ao comprimir imagem:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao processar a imagem',
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    const removerFoto = () => {
      form.value.foto = null
      form.value.fotoPreview = null

      $q.notify({
        type: 'info',
        message: 'Foto removida',
        timeout: 2000,
        position: 'top-right'
      })
    }

    // Função para verificar uso do localStorage
    const verificarEspacoLocalStorage = () => {
      try {
        const clientesData = localStorage.getItem('clientes') || '[]'
        const sizeInBytes = new Blob([clientesData]).size
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2)

        console.log(`Uso do localStorage - Clientes: ${sizeInMB}MB`)

        // Estimar limite do localStorage (geralmente 5-10MB)
        if (sizeInBytes > 4 * 1024 * 1024) { // 4MB
          $q.notify({
            type: 'warning',
            message: `Armazenamento local quase cheio (${sizeInMB}MB). Considere remover fotos de clientes antigos.`,
            timeout: 5000,
            position: 'top-right'
          })
        }
      } catch (error) {
        console.error('Erro ao verificar espaço:', error)
      }
    }

    return {
      form,
      imoveisExpanded,
      secaoAtual,
      secoes,
      proximaSecao,
      voltarSecao,
      validarSecaoAtual,
      validarDadosPessoais,
      validarEnderecos,
      validarImoveis,
      validarObservacoes,
      isEditMode,
      loading,
      cliente,
      onSubmit,
      adicionarNovoImovel,
      removerImovel,
      copiarEnderecoCliente,
      buscarEnderecoPorCep,
      voltarParaListagem,
      onFotoSelecionada,
      removerFoto,
      verificarEspacoLocalStorage,
      onImagensSelecionadas,
      onImagemCamera,
      removerImagemImovel,
      formatarData
    }
  }
}
</script>

<style lang="sass" scoped>
// Layout responsivo
.desktop-layout
  display: block

.mobile-layout
  display: none

@media (max-width: 1023px)
  .desktop-layout
    display: none

  .mobile-layout
    display: block

// Carrossel customizado
.q-carousel
  border-radius: 8px
  overflow: hidden

.q-carousel-slide
  padding: 0 !important

// Estilos para foto do cliente
.foto-cliente-container
  .q-avatar
    border: 2px solid var(--q-primary)
    transition: border-color 0.3s ease

    &:hover
      border-color: var(--q-secondary)

  .q-btn
    transition: all 0.3s ease

    &:hover
      transform: translateY(-1px)

// Estilos para imagens dos imóveis
.imagem-preview
  transition: all 0.3s ease

  &:hover
    transform: scale(1.02)
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)

  .q-img
    border-radius: 8px

  .q-btn
    background: rgba(0, 0, 0, 0.7)
    backdrop-filter: blur(4px)

    &:hover
      background: rgba(244, 67, 54, 0.9)
      transform: scale(1.1)
</style>
